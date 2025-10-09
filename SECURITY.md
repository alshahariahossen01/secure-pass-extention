# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Features

Secure Pass Vault implements multiple layers of security to protect your data:

### Encryption
- **Algorithm**: AES-256-GCM (Advanced Encryption Standard, Galois/Counter Mode)
- **Key Derivation**: PBKDF2 with SHA-256
- **Iterations**: 100,000 (exceeds OWASP recommendations)
- **Key Length**: 256 bits
- **Salt**: Unique 16-byte random salt per encryption
- **IV**: Unique 12-byte random initialization vector per encryption

### Data Storage
- **Location**: Local browser storage only (Chrome Storage API)
- **No Cloud Sync**: All data remains on your device
- **Zero-Knowledge**: Only you can decrypt your data
- **No External Requests**: Extension makes no network calls

### Authentication
- **Master Password**: Never stored, only hashed for verification
- **Hash Algorithm**: SHA-256
- **Biometric**: WebAuthn API for fingerprint/Face ID
- **Auto-Lock**: Configurable timeout (1-60 minutes)

### Code Security
- **Manifest V3**: Latest Chrome extension security standards
- **Content Security Policy**: Strict CSP headers
- **No eval()**: No dynamic code execution
- **Input Validation**: All inputs sanitized and validated
- **XSS Protection**: Proper escaping of user content

## Reporting a Vulnerability

**Please DO NOT report security vulnerabilities through public GitHub issues.**

### How to Report

1. **Email**: Send details to security@securepassvault.com (TBD)
2. **PGP Key**: Available at [TBD]
3. **Response Time**: We aim to respond within 48 hours

### What to Include

Please provide:
- Type of vulnerability
- Full description of the issue
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### What to Expect

1. **Acknowledgment**: We'll confirm receipt within 48 hours
2. **Assessment**: We'll evaluate the vulnerability
3. **Timeline**: We'll provide an expected fix timeline
4. **Credit**: We'll credit you in the fix announcement (if desired)
5. **Disclosure**: We'll coordinate responsible disclosure

### Bug Bounty

Currently, we do not offer a bug bounty program. However, we greatly appreciate security research and will:
- Credit researchers in security advisories
- Acknowledge contributions in release notes
- Prioritize security fixes

## Security Best Practices for Users

### Master Password
- Use a unique, strong master password (12+ characters)
- Include uppercase, lowercase, numbers, and symbols
- Never reuse from other services
- Consider using a passphrase
- Don't share with anyone

### Device Security
- Keep your OS and browser updated
- Use full-disk encryption
- Enable screen lock (password/biometric)
- Be cautious on public/shared computers
- Use auto-lock feature (short timeout on public devices)

### Extension Security
- Only install from official sources
- Review permissions before installing
- Keep extension updated
- Regularly backup encrypted data
- Use biometric authentication when available

### Data Backup
- Export encrypted backups regularly
- Store backups securely
- Test restore process periodically
- Keep backups in multiple locations
- Consider additional encryption for backups

### Phishing Protection
- Verify URLs before entering credentials
- Be suspicious of unexpected password requests
- Don't enter master password on suspicious sites
- Extension only shows on valid login forms
- Check for HTTPS on all login pages

## Known Limitations

### Not Protected Against
- Keyloggers on compromised devices
- Screen recording malware
- Physical access to unlocked device
- Browser vulnerabilities (0-days)
- OS-level compromises

### Recommendations
- Use trusted, malware-free devices
- Keep all software updated
- Use antivirus/anti-malware
- Enable full-disk encryption
- Use secure, trusted networks

## Security Checklist

Before using Secure Pass Vault, ensure:

- [ ] Device is malware-free
- [ ] Browser is up-to-date
- [ ] Extension is from official source
- [ ] Strong master password created
- [ ] Auto-lock timeout configured
- [ ] Regular backup schedule planned
- [ ] Device has screen lock enabled
- [ ] Full-disk encryption enabled (recommended)

## Cryptographic Implementation Details

### Password Generation
```javascript
// Uses cryptographically secure random number generator
crypto.getRandomValues(array)
```

### Key Derivation
```javascript
PBKDF2(
  password: user_master_password,
  salt: random_16_bytes,
  iterations: 100000,
  hash: SHA-256,
  keyLength: 256 bits
)
```

### Encryption
```javascript
AES-256-GCM(
  plaintext: JSON.stringify(data),
  key: derived_key,
  iv: random_12_bytes,
  tagLength: 128 bits
)
```

### TOTP Generation
```javascript
HMAC-SHA1(
  key: base32_decoded_secret,
  message: time_step,
  output: 6_digit_code
)
```

## Compliance

This extension aims to comply with:
- OWASP Password Storage Guidelines
- NIST SP 800-63B Digital Identity Guidelines
- RFC 6238 (TOTP)
- Web Crypto API standards
- WebAuthn standards

## Updates and Patches

- Security updates are prioritized
- Critical vulnerabilities patched within 7 days
- Regular updates follow semantic versioning
- Security advisories published for all patches
- Users notified of critical updates

## Third-Party Dependencies

Secure Pass Vault uses:
- **Web Crypto API**: Browser built-in (no external dependencies)
- **Chrome Storage API**: Browser built-in
- **WebAuthn API**: Browser built-in

No external libraries or CDNs are used, minimizing attack surface.

## Audit History

| Date | Auditor | Scope | Findings | Status |
|------|---------|-------|----------|--------|
| TBD  | TBD     | TBD   | TBD      | TBD    |

## Contact

- **Security Email**: security@securepassvault.com (TBD)
- **General Issues**: [GitHub Issues](../../issues)
- **PGP Key**: [TBD]

---

**Last Updated**: 2024
**Version**: 1.0.0
