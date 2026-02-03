# Security Best Practices

## Core Principles

- Validate all input before processing
- Sanitize file paths and prevent directory traversal
- Use timeouts on subprocess and network calls
- Enforce file size limits before reading
- Always use context managers (`with`) for resources
- Never execute arbitrary code or unsanitized commands
- Implement proper sandboxing for untrusted operations

## Input Validation

### Path Validation and Sanitization

```python
import os
from pathlib import Path

class SecurityError(Exception):
    """Raised when security constraint is violated."""
    pass

def validate_path(path: str, work_dir: str) -> str:
    """Validate path is within work directory.
    
    Args:
        path: Path to validate (relative or absolute)
        work_dir: Base working directory for sandboxing
        
    Returns:
        Absolute path if valid
        
    Raises:
        SecurityError: If path escapes work_dir
    """
    # Convert to absolute path
    abs_path = os.path.abspath(os.path.join(work_dir, path))
    abs_work_dir = os.path.abspath(work_dir)
    
    # Ensure path is within work_dir
    if not abs_path.startswith(abs_work_dir + os.sep):
        raise SecurityError(
            f"Path '{path}' escapes work directory '{work_dir}'. "
            f"Resolved to: {abs_path}"
        )
    
    return abs_path

def safe_open(filepath: str, work_dir: str, mode: str = 'r', max_size_mb: int = 100):
    """Safely open a file with validation and size limits.
    
    Args:
        filepath: Path to file
        work_dir: Working directory boundary
        mode: File mode ('r', 'w', etc.)
        max_size_mb: Maximum file size in MB
        
    Returns:
        File handle
        
    Raises:
        SecurityError: If path is invalid or file too large
    """
    validated_path = validate_path(filepath, work_dir)
    
    # Check file size before reading
    if 'r' in mode and os.path.exists(validated_path):
        size_mb = os.path.getsize(validated_path) / (1024 * 1024)
        if size_mb > max_size_mb:
            raise SecurityError(
                f"File {filepath} too large: {size_mb:.1f}MB "
                f"(max: {max_size_mb}MB)"
            )
    
    return open(validated_path, mode)
```

### Input Sanitization

```python
import re

def sanitize_sample_id(sample_id: str) -> str:
    """Sanitize sample ID to prevent injection attacks.
    
    Args:
        sample_id: Raw sample identifier
        
    Returns:
        Sanitized sample ID
        
    Raises:
        ValidationError: If sample ID contains invalid characters
    """
    # Only allow alphanumeric, underscore, hyphen
    if not re.match(r'^[a-zA-Z0-9_-]+$', sample_id):
        raise ValidationError(
            f"Invalid sample ID: '{sample_id}'. "
            f"Only alphanumeric, underscore, and hyphen allowed."
        )
    
    # Limit length
    if len(sample_id) > 100:
        raise ValidationError(f"Sample ID too long: {len(sample_id)} chars (max: 100)")
    
    return sample_id

def sanitize_filename(filename: str) -> str:
    """Sanitize filename to prevent path traversal.
    
    Args:
        filename: Raw filename
        
    Returns:
        Sanitized filename
    """
    # Remove path separators
    filename = os.path.basename(filename)
    
    # Remove or replace dangerous characters
    filename = re.sub(r'[^\w\s.-]', '_', filename)
    
    # Remove leading dots (hidden files)
    filename = filename.lstrip('.')
    
    if not filename:
        raise ValidationError("Invalid filename")
    
    return filename
```

## Command Execution Safety

### Subprocess with Timeout and Validation

```python
import subprocess
import shlex
from typing import List

def run_safe_command(
    cmd: List[str],
    work_dir: str,
    timeout: int = 300,
    allowed_commands: set[str] | None = None
) -> subprocess.CompletedProcess:
    """Execute command safely with validation and timeout.
    
    Args:
        cmd: Command and arguments as list
        work_dir: Working directory
        timeout: Timeout in seconds
        allowed_commands: Set of allowed command names (if None, all allowed)
        
    Returns:
        Completed process
        
    Raises:
        SecurityError: If command is not allowed or contains dangerous patterns
        subprocess.TimeoutExpired: If command exceeds timeout
    """
    if not cmd:
        raise SecurityError("Empty command")
    
    # Validate command is in allowlist
    command_name = os.path.basename(cmd[0])
    if allowed_commands and command_name not in allowed_commands:
        raise SecurityError(
            f"Command '{command_name}' not allowed. "
            f"Allowed: {', '.join(sorted(allowed_commands))}"
        )
    
    # Check for command injection patterns
    full_cmd = ' '.join(cmd)
    dangerous_patterns = [';', '&&', '||', '|', '>', '<', '$(', '`']
    for pattern in dangerous_patterns:
        if pattern in full_cmd:
            raise SecurityError(
                f"Dangerous pattern '{pattern}' detected in command"
            )
    
    # Execute with timeout and capture output
    try:
        result = subprocess.run(
            cmd,
            cwd=work_dir,
            timeout=timeout,
            capture_output=True,
            text=True,
            check=False  # Don't raise on non-zero exit
        )
        return result
        
    except subprocess.TimeoutExpired:
        raise SecurityError(
            f"Command timed out after {timeout}s: {' '.join(cmd)}"
        )

# Example usage
allowed_tools = {'samtools', 'bcftools', 'fastqc'}
result = run_safe_command(
    ['samtools', 'view', 'input.bam'],
    work_dir='/safe/workdir',
    timeout=60,
    allowed_commands=allowed_tools
)
```

### Avoiding Shell Injection

```python
# ❌ BAD: Shell injection vulnerability
def run_alignment_unsafe(input_file: str, output_file: str):
    cmd = f"bwa mem ref.fa {input_file} > {output_file}"
    os.system(cmd)  # NEVER DO THIS!

# ✅ GOOD: Use subprocess with list arguments
def run_alignment_safe(input_file: str, output_file: str, work_dir: str):
    """Run alignment safely."""
    # Validate paths
    input_path = validate_path(input_file, work_dir)
    output_path = validate_path(output_file, work_dir)
    
    # Use list of arguments (not shell string)
    cmd = ['bwa', 'mem', 'ref.fa', input_path]
    
    # Execute without shell
    with open(output_path, 'w') as outf:
        subprocess.run(
            cmd,
            stdout=outf,
            shell=False,  # Critical: never use shell=True with user input
            timeout=600,
            check=True
        )
```

## Resource Management

### Context Managers for Safe Resource Handling

```python
from contextlib import contextmanager
import tempfile
import shutil

@contextmanager
def safe_temp_dir():
    """Create temporary directory with automatic cleanup.
    
    Yields:
        Path to temporary directory
    """
    tmpdir = tempfile.mkdtemp()
    try:
        yield tmpdir
    finally:
        # Always cleanup, even on exception
        shutil.rmtree(tmpdir, ignore_errors=True)

# Usage
with safe_temp_dir() as tmpdir:
    # Work with temporary directory
    work_file = os.path.join(tmpdir, "work.txt")
    with open(work_file, 'w') as f:
        f.write("temporary data")
# tmpdir automatically deleted here

@contextmanager
def safe_file_operation(filepath: str, work_dir: str, mode: str = 'r'):
    """Safely open file with automatic cleanup and error handling.
    
    Args:
        filepath: Path to file
        work_dir: Working directory
        mode: File mode
        
    Yields:
        File handle
    """
    validated_path = validate_path(filepath, work_dir)
    f = None
    try:
        f = open(validated_path, mode)
        yield f
    except Exception as e:
        logger.exception(f"Error during file operation: {filepath}")
        raise
    finally:
        if f:
            f.close()
```

### Memory and File Size Limits

```python
def read_file_safely(
    filepath: str,
    work_dir: str,
    max_size_mb: int = 100,
    chunk_size: int = 8192
) -> str:
    """Read file with size validation and memory-efficient chunking.
    
    Args:
        filepath: Path to file
        work_dir: Working directory
        max_size_mb: Maximum file size in MB
        chunk_size: Bytes to read per chunk
        
    Returns:
        File contents
        
    Raises:
        SecurityError: If file exceeds size limit
    """
    validated_path = validate_path(filepath, work_dir)
    
    # Check size before reading
    size_bytes = os.path.getsize(validated_path)
    size_mb = size_bytes / (1024 * 1024)
    
    if size_mb > max_size_mb:
        raise SecurityError(
            f"File {filepath} too large: {size_mb:.1f}MB (max: {max_size_mb}MB)"
        )
    
    # Read in chunks to avoid loading huge files at once
    content = []
    with open(validated_path, 'r') as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            content.append(chunk)
    
    return ''.join(content)

def process_large_file_streaming(filepath: str, work_dir: str):
    """Process large file line-by-line to conserve memory.
    
    Args:
        filepath: Path to file
        work_dir: Working directory
    """
    validated_path = validate_path(filepath, work_dir)
    
    with open(validated_path, 'r') as f:
        for line_num, line in enumerate(f, 1):
            # Process one line at a time
            process_line(line)
            
            # Safety check: abort if too many lines
            if line_num > 1_000_000:
                raise SecurityError(
                    f"File {filepath} has too many lines (>{line_num})"
                )
```

## Network Operations

### Timeouts and Retry Limits

```python
import requests
from typing import Any

def safe_http_request(
    url: str,
    timeout: int = 10,
    max_retries: int = 3,
    allowed_domains: set[str] | None = None
) -> dict[str, Any]:
    """Make HTTP request with security constraints.
    
    Args:
        url: URL to fetch
        timeout: Request timeout in seconds
        max_retries: Maximum retry attempts
        allowed_domains: Set of allowed domains (if None, all allowed)
        
    Returns:
        Response JSON
        
    Raises:
        SecurityError: If domain not allowed or request unsafe
    """
    from urllib.parse import urlparse
    
    # Validate domain
    parsed = urlparse(url)
    if allowed_domains and parsed.netloc not in allowed_domains:
        raise SecurityError(
            f"Domain '{parsed.netloc}' not allowed. "
            f"Allowed: {', '.join(sorted(allowed_domains))}"
        )
    
    # Prevent SSRF to local/private networks
    if parsed.netloc in ['localhost', '127.0.0.1', '0.0.0.0']:
        raise SecurityError(f"Cannot access localhost: {url}")
    
    if parsed.netloc.startswith('192.168.') or parsed.netloc.startswith('10.'):
        raise SecurityError(f"Cannot access private network: {url}")
    
    # Make request with timeout
    for attempt in range(max_retries):
        try:
            response = requests.get(
                url,
                timeout=timeout,
                allow_redirects=False  # Prevent redirect-based attacks
            )
            response.raise_for_status()
            return response.json()
            
        except requests.Timeout:
            if attempt == max_retries - 1:
                raise SecurityError(f"Request timed out after {max_retries} attempts")
        except requests.RequestException as e:
            raise SecurityError(f"Request failed: {e}")
```

## Data Validation

### Type and Range Validation

```python
from typing import Any

def validate_config(config: dict[str, Any]) -> None:
    """Validate configuration with type and range checks.
    
    Args:
        config: Configuration dictionary
        
    Raises:
        ValidationError: If configuration is invalid
    """
    required_fields = {
        'threads': (int, 1, 64),
        'memory_gb': (int, 1, 256),
        'timeout': (int, 1, 86400),
        'work_dir': (str, None, None),
    }
    
    for field, (expected_type, min_val, max_val) in required_fields.items():
        if field not in config:
            raise ValidationError(f"Missing required field: {field}")
        
        value = config[field]
        
        # Type check
        if not isinstance(value, expected_type):
            raise ValidationError(
                f"Field '{field}' must be {expected_type.__name__}, "
                f"got {type(value).__name__}"
            )
        
        # Range check for numeric values
        if expected_type in (int, float) and min_val is not None:
            if value < min_val or value > max_val:
                raise ValidationError(
                    f"Field '{field}' out of range: {value} "
                    f"(valid: {min_val}-{max_val})"
                )
```

## Genomics-Specific Security

### FASTQ/FASTA File Validation

```python
def validate_fasta_header(header: str) -> None:
    """Validate FASTA header for security issues.
    
    Args:
        header: FASTA header line
        
    Raises:
        SecurityError: If header contains dangerous patterns
    """
    # Check for command injection patterns
    if any(c in header for c in [';', '|', '&', '$', '`']):
        raise SecurityError(f"Invalid characters in FASTA header: {header}")
    
    # Limit header length
    if len(header) > 1000:
        raise SecurityError(f"FASTA header too long: {len(header)} chars")

def safe_parse_vcf(vcf_path: str, work_dir: str, max_variants: int = 10_000_000):
    """Parse VCF file with safety limits.
    
    Args:
        vcf_path: Path to VCF file
        work_dir: Working directory
        max_variants: Maximum number of variants to parse
        
    Yields:
        Variant records
        
    Raises:
        SecurityError: If file exceeds safety limits
    """
    validated_path = validate_path(vcf_path, work_dir)
    
    variant_count = 0
    with open(validated_path, 'r') as f:
        for line in f:
            # Skip headers
            if line.startswith('#'):
                continue
            
            variant_count += 1
            if variant_count > max_variants:
                raise SecurityError(
                    f"VCF file contains too many variants: >{max_variants}"
                )
            
            yield parse_vcf_line(line)
```

## Security Testing

```python
import pytest

def test_validate_path_blocks_directory_traversal():
    """Test that path validation blocks directory traversal."""
    work_dir = "/safe/work/dir"
    
    malicious_paths = [
        "../../../etc/passwd",
        "/etc/passwd",
        "safe/../../../etc/passwd",
        "..\\..\\..\\windows\\system32",
    ]
    
    for malicious in malicious_paths:
        with pytest.raises(SecurityError):
            validate_path(malicious, work_dir)

def test_run_safe_command_blocks_injection():
    """Test command execution blocks injection attempts."""
    work_dir = "/tmp/test"
    
    # Command injection attempts
    with pytest.raises(SecurityError):
        run_safe_command(['ls', '; rm -rf /'], work_dir)
    
    with pytest.raises(SecurityError):
        run_safe_command(['cat', 'file.txt && cat /etc/passwd'], work_dir)

def test_file_size_limit_enforced():
    """Test file reading enforces size limits."""
    # Create large file
    large_file = "/tmp/large.txt"
    with open(large_file, 'w') as f:
        f.write("A" * 200 * 1024 * 1024)  # 200 MB
    
    with pytest.raises(SecurityError, match="too large"):
        read_file_safely(large_file, "/tmp", max_size_mb=100)
```

## Security Checklist

Before deploying code that processes untrusted input:

- [ ] All file paths validated with `validate_path()`
- [ ] File size limits enforced before reading
- [ ] Subprocess calls use list arguments (not shell strings)
- [ ] Timeouts set on all subprocess and network calls
- [ ] Command allowlists implemented for external tools
- [ ] Input sanitized (sample IDs, filenames, parameters)
- [ ] Context managers used for all resource access
- [ ] Error messages don't leak sensitive paths
- [ ] Security tests written and passing
- [ ] Code review completed with security focus
