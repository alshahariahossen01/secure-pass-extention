# Quick Start Guide - Secure Pass Vault

Get up and running with Secure Pass Vault in minutes!

## 📦 Installation (2 minutes)

### Chrome / Edge / Brave
1. Download or clone this repository
2. Open `chrome://extensions/` (or `edge://extensions/` for Edge)
3. Enable "Developer mode" toggle (top right)
4. Click "Load unpacked"
5. Select the `secure-pass-extention` folder
6. Pin the extension to your toolbar (click puzzle icon → pin)

### Firefox
1. Download or clone this repository
2. Open `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Select `manifest.json` from the folder

## 🔐 First-Time Setup (1 minute)

1. **Click the extension icon** 🔐 in your toolbar
2. **Click** "First time? Set up master password"
3. **Create** a strong master password (min 8 characters)
4. **Confirm** your password
5. **Click** "Create"

✅ Your vault is now ready!

## 🎯 Common Tasks

### Add Your First Password
1. Click the extension icon
2. Click "+ Add Password"
3. Fill in:
   - Website URL (e.g., https://github.com)
   - Site Name (e.g., GitHub)
   - Username/Email
   - Password (or use "Use Generated Password")
4. Click "Save"

### Generate a Strong Password
1. Click the extension icon
2. Go to "Generator" tab
3. Adjust settings:
   - Length (8-32 characters)
   - Character types (uppercase, lowercase, numbers, symbols)
4. Click "Generate Password"
5. Click 📋 to copy
6. Or use in "Add Password" form

### Auto-Fill Login
1. Visit a login page (e.g., github.com)
2. Click the extension icon
3. Find your saved password
4. Click on it
5. Confirm to copy and auto-fill
6. Your credentials are filled automatically!

### Set Up 2FA (TOTP)
1. Click the extension icon
2. Go to "2FA" tab
3. Click "+ Add 2FA Code"
4. Enter:
   - Service name (e.g., "Google")
   - Secret key (from 2FA setup)
5. Click "Save"
6. Click the code to copy when needed

### Enable Biometric Unlock
1. Click gear icon ⚙️ in the extension
2. Check "Enable Biometric Authentication"
3. Follow browser prompts
4. Now use "🧬 Unlock with Biometric" button

## ⌨️ Keyboard Shortcuts

- **Windows/Linux**: `Ctrl + Shift + P`
- **macOS**: `Cmd + Shift + P`

Opens the vault popup instantly!

## 🔒 Security Tips

### Strong Master Password
✅ DO:
- Use 12+ characters
- Mix uppercase, lowercase, numbers, symbols
- Use a passphrase (e.g., "Correct-Horse-Battery-Staple-2024")
- Make it unique (not used elsewhere)

❌ DON'T:
- Use dictionary words
- Reuse from other services
- Share with anyone
- Write it down in plain text

### Regular Backups
1. Click gear icon ⚙️
2. Click "Export Data (Encrypted)"
3. Save the file securely
4. Store in a safe location (external drive, encrypted folder)
5. Do this monthly or after major changes

### Auto-Lock Settings
1. Click gear icon ⚙️
2. Set "Auto-Lock Timeout" to:
   - 1-5 minutes for public computers
   - 15-30 minutes for personal devices
   - 1 hour for very trusted environments

## 🚀 Advanced Features

### Import Existing Passwords
1. Export from your current password manager (as encrypted JSON)
2. Click gear icon ⚙️
3. Click "Import Data"
4. Select your backup file
5. Confirm import

### Change Master Password
1. Click gear icon ⚙️
2. Click "Change Master Password"
3. Enter current password
4. Enter new password
5. Confirm new password
6. All data is automatically re-encrypted

### Search Passwords
1. Open the extension
2. In "Passwords" tab
3. Use the search box 🔍
4. Type site name, username, or URL
5. Instantly filter your passwords

## 🐛 Troubleshooting

### Extension Not Loading
- ✓ Check you selected the correct folder (contains manifest.json)
- ✓ Ensure browser version is compatible (Chrome 88+, Firefox 89+)
- ✓ Look for errors in browser console

### Biometric Not Working
- ✓ Ensure device has biometric hardware
- ✓ Check browser supports WebAuthn
- ✓ Unlock with password first, then enable biometric
- ✓ Try unlocking with master password as fallback

### Auto-Fill Not Working
- ✓ Refresh the page after installing extension
- ✓ Check extension has permission for the site
- ✓ Some sites block auto-fill (bank security)
- ✓ Manually copy password if needed

### Forgot Master Password
⚠️ **Cannot be recovered!** The master password is never stored.

Options:
1. Try to remember variations of your password
2. Restore from backup (if you have one)
3. Clear all data and start fresh (Settings → Clear All Data)

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed features
- Check [INSTALLATION.md](INSTALLATION.md) for detailed setup
- Review [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- Star the repository if you find it useful!

## 🆘 Getting Help

- 📖 Check documentation files
- 🐛 Open an issue on GitHub
- 💬 Read existing issues for solutions
- 📧 Contact: [Create an issue](../../issues)

---

**Made with 🔒 for your security and privacy**

Happy password managing! 🎉
