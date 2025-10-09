# Installation Guide for Secure Pass Vault

## Quick Start

### Chrome / Edge / Brave

1. **Download the Extension**
   - Clone or download this repository
   - Or download the latest release from the releases page

2. **Open Extensions Page**
   - Chrome: Navigate to `chrome://extensions/`
   - Edge: Navigate to `edge://extensions/`
   - Brave: Navigate to `brave://extensions/`

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `secure-pass-extention` folder
   - The extension should now appear in your extensions list

5. **Pin the Extension** (Optional but recommended)
   - Click the puzzle piece icon in the toolbar
   - Find "Secure Pass Vault"
   - Click the pin icon to keep it visible

### Firefox

1. **Download the Extension**
   - Clone or download this repository

2. **Open Debugging Page**
   - Navigate to `about:debugging#/runtime/this-firefox`

3. **Load Temporary Add-on**
   - Click "Load Temporary Add-on..."
   - Navigate to the extension folder
   - Select the `manifest.json` file

4. **Note**: Temporary add-ons in Firefox are removed when you close the browser. For permanent installation, the extension needs to be signed by Mozilla.

## First Time Setup

1. **Click the Extension Icon**
   - Look for the 🔐 icon in your browser toolbar

2. **Create Master Password**
   - Click "First time? Set up master password"
   - Enter a strong master password (minimum 8 characters)
   - Confirm your password
   - Click "Create"

3. **Your Vault is Ready!**
   - You can now start adding passwords

## Using Keyboard Shortcuts

- **Windows/Linux**: `Ctrl + Shift + P`
- **macOS**: `Cmd + Shift + P`

This will open the Secure Pass Vault popup quickly.

## Enabling Biometric Authentication

1. **Open Settings**
   - Click the gear icon ⚙️ in the extension popup
   - Or right-click the extension icon and select "Options"

2. **Enable Biometric**
   - Check "Enable Biometric Authentication"
   - Follow your browser's prompts to set up biometric authentication
   - Your device must support fingerprint or Face ID

3. **Unlock with Biometric**
   - Click the "🧬 Unlock with Biometric" button
   - Use your fingerprint or Face ID to unlock

## Troubleshooting

### Extension Not Loading
- Ensure you selected the correct folder containing `manifest.json`
- Check browser console for errors
- Make sure you're using a compatible browser version

### Biometric Not Working
- Verify your device supports biometric authentication
- Check browser permissions for biometric access
- Try unlocking with master password first

### Auto-Fill Not Working
- Ensure the extension has permission to access the website
- Check that you're on a login page with password fields
- The extension may need a page refresh to detect forms

### Data Not Saving
- Check browser storage permissions
- Ensure you're not in incognito/private mode (unless extension is enabled for private browsing)

## Security Tips

1. **Strong Master Password**
   - Use a unique, complex password
   - Don't reuse passwords from other services
   - Consider using a passphrase (e.g., "correct-horse-battery-staple")

2. **Regular Backups**
   - Export your data regularly (Settings → Export Data)
   - Store backups securely
   - Consider encrypting backup files additionally

3. **Keep Extension Updated**
   - Check for updates regularly
   - Review changelog for security fixes

4. **Device Security**
   - Keep your OS and browser updated
   - Use full-disk encryption
   - Enable screen lock

## Uninstallation

### To Remove the Extension

1. **Chrome/Edge/Brave**
   - Go to extensions page
   - Find "Secure Pass Vault"
   - Click "Remove"

2. **Firefox**
   - Go to `about:addons`
   - Find "Secure Pass Vault"
   - Click "Remove"

### To Preserve Your Data

**Before uninstalling:**
1. Open the extension settings
2. Click "Export Data"
3. Save the encrypted backup file
4. You can import this later if you reinstall

**⚠️ Warning:** Uninstalling the extension will delete all stored passwords unless you export them first!

## Support

If you encounter issues:
1. Check this installation guide
2. Review the main README.md
3. Open an issue on GitHub
4. Include browser version and error messages
