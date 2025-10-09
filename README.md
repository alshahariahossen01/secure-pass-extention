# 🔐 Secure Pass Vault

Secure Pass Vault is a full-featured browser extension designed to protect your online identity and simplify login security.

## ✨ Features

### 🔑 Password Generation & Management
- Generate strong, unique passwords with customizable options
- Store unlimited passwords securely
- Quick search and filter functionality
- Password strength indicator
- Copy passwords with one click

### ⚡ Auto-Fill Login Forms
- Automatically detect login forms on websites
- One-click auto-fill for saved credentials
- Visual indicators on password fields
- Smart form detection

### 🧬 Biometric Authentication
- Unlock your vault using fingerprint or Face ID
- Platform authenticator support via WebAuthn
- Secure biometric credential storage
- Fallback to master password

### ⏱️ Built-in TOTP 2FA Support
- Generate time-based one-time passwords
- Support for multiple 2FA accounts
- Real-time code generation with countdown timer
- Easy copy-to-clipboard functionality

### 🔐 Local-Only Encrypted Storage
- All data stored locally on your device
- AES-256-GCM encryption
- PBKDF2 key derivation (100,000 iterations)
- No cloud sync - complete privacy
- Zero-knowledge architecture

## 🚀 Installation

### For Development
1. Clone this repository
2. Open your browser's extension management page:
   - Chrome: `chrome://extensions`
   - Firefox: `about:debugging#/runtime/this-firefox`
   - Edge: `edge://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory

### From Store (Coming Soon)
- Chrome Web Store: (Link TBD)
- Firefox Add-ons: (Link TBD)
- Microsoft Edge Add-ons: (Link TBD)

## 📖 Usage

### First Time Setup
1. Click the extension icon in your browser toolbar
2. Click "First time? Set up master password"
3. Create a strong master password (minimum 8 characters)
4. Your vault is ready to use!

### Adding Passwords
1. Click the extension icon
2. Navigate to the "Passwords" tab
3. Click "+ Add Password"
4. Fill in the website details and credentials
5. Optionally use the password generator for strong passwords

### Using Password Generator
1. Navigate to the "Generator" tab
2. Adjust password length and character options
3. Click "Generate Password"
4. Copy or use the generated password

### Setting Up 2FA
1. Navigate to the "2FA" tab
2. Click "+ Add 2FA Code"
3. Enter the service name and secret key
4. Click to copy the TOTP code when needed

### Auto-Fill
1. Visit a login page
2. Look for the 🔐 icon in password fields
3. Click the extension icon
4. Select your saved credentials
5. Credentials will be auto-filled

## 🔒 Security Features

- **Master Password**: Your vault is protected by a master password that is never stored
- **AES-256-GCM Encryption**: Military-grade encryption for all stored data
- **PBKDF2 Key Derivation**: 100,000 iterations for key strengthening
- **Local Storage Only**: No data ever leaves your device
- **Auto-Lock**: Automatically locks after a configurable timeout
- **Biometric Support**: Use fingerprint/Face ID for quick access
- **Zero-Knowledge**: Only you can decrypt your data

## ⚙️ Settings

Access settings by clicking the gear icon in the extension popup:

- **Auto-Lock Timeout**: Configure when the vault automatically locks (1-60 minutes)
- **Biometric Authentication**: Enable/disable fingerprint or Face ID
- **Change Master Password**: Update your master password securely
- **Export Data**: Download an encrypted backup of your vault
- **Import Data**: Restore from an encrypted backup
- **Clear All Data**: Permanently delete all stored data

## 🛠️ Technical Stack

- **Manifest Version**: 3 (latest Chrome extension format)
- **Encryption**: Web Crypto API (AES-256-GCM, PBKDF2)
- **Authentication**: Web Authentication API (WebAuthn)
- **TOTP**: Custom implementation using HMAC-SHA1
- **Storage**: Chrome Storage API (local)
- **UI**: Vanilla JavaScript, CSS3

## 📋 Browser Compatibility

- ✅ Chrome/Chromium (v88+)
- ✅ Microsoft Edge (v88+)
- ✅ Brave
- ✅ Firefox (v89+)
- ✅ Opera

## 🔐 Privacy Policy

Secure Pass Vault is committed to your privacy:

- **No Data Collection**: We don't collect any user data
- **No Analytics**: No tracking or analytics
- **No Cloud Sync**: All data stays on your device
- **No Accounts**: No registration or login required
- **Open Source**: Code is available for review

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚠️ Disclaimer

While Secure Pass Vault uses strong encryption and security practices, no system is 100% secure. Always:
- Use a strong master password
- Keep your device secure
- Backup your data regularly
- Be cautious of phishing attempts

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@securepassvault.com (TBD)

## 🙏 Acknowledgments

- Icons: Custom designed
- Encryption: Web Crypto API
- TOTP Algorithm: RFC 6238

---

**Made with 🔒 for your security and privacy**
