# 🧪 Testing Checklist for Secure Pass Vault

## Pre-Installation Tests
- [ ] All files present (22 files total)
- [ ] manifest.json is valid JSON
- [ ] All JavaScript files are syntactically valid
- [ ] All HTML files are well-formed
- [ ] Icons are present (16x16, 48x48, 128x128)

## Installation Tests

### Chrome/Edge/Brave
- [ ] Load unpacked extension successfully
- [ ] No errors in console
- [ ] Extension icon appears in toolbar
- [ ] Extension appears in chrome://extensions

### Firefox
- [ ] Load temporary add-on successfully
- [ ] No errors in browser console
- [ ] Extension icon appears in toolbar

## Initial Setup Tests
- [ ] Click extension icon opens popup
- [ ] "Set up master password" link visible
- [ ] Can create master password (8+ chars)
- [ ] Password confirmation works
- [ ] Weak passwords rejected (< 8 chars)
- [ ] Master password hash stored (check storage)
- [ ] Setup modal closes on success

## Authentication Tests
- [ ] Correct password unlocks vault
- [ ] Incorrect password shows error
- [ ] Master password field clears on error
- [ ] Vault remains locked on error
- [ ] Auth section hides when unlocked
- [ ] Main section shows when unlocked

## Password Management Tests

### Add Password
- [ ] "Add Password" button opens modal
- [ ] All fields accept input
- [ ] "Use Generated Password" fills password field
- [ ] Save button stores password
- [ ] Password appears in list
- [ ] Modal closes on save
- [ ] Required fields validated

### View/Search Passwords
- [ ] All saved passwords display
- [ ] Click password shows details
- [ ] Copy confirmation appears
- [ ] Search filters passwords correctly
- [ ] Search by name works
- [ ] Search by username works
- [ ] Search by URL works

### Delete Password (if implemented)
- [ ] Delete confirmation shown
- [ ] Password removed from list
- [ ] Storage updated

## Password Generator Tests
- [ ] Switch to Generator tab works
- [ ] Length slider adjusts value (8-32)
- [ ] Length display updates
- [ ] Generate button creates password
- [ ] Password appears in field
- [ ] Password changes on each generate
- [ ] Copy button works
- [ ] Copy confirmation shown (✓)

### Character Options
- [ ] Uppercase toggle works
- [ ] Lowercase toggle works
- [ ] Numbers toggle works
- [ ] Symbols toggle works
- [ ] At least one option required
- [ ] Generated password respects options

### Strength Indicator
- [ ] Weak password shows red/weak
- [ ] Medium password shows yellow/medium
- [ ] Strong password shows green/strong
- [ ] Indicator updates on generate

## TOTP 2FA Tests
- [ ] Switch to 2FA tab works
- [ ] "Add 2FA Code" opens modal
- [ ] Service name field works
- [ ] Secret key field works
- [ ] Save stores TOTP code
- [ ] Modal closes on save

### TOTP Generation
- [ ] 6-digit code displays
- [ ] Code format is correct (XXX XXX or XXXXXX)
- [ ] Countdown timer shows (1-30s)
- [ ] Timer counts down every second
- [ ] Code regenerates at 0 seconds
- [ ] Click code copies to clipboard
- [ ] Copy confirmation shown

## Auto-Fill Tests

### Form Detection
- [ ] Visit login page (e.g., github.com/login)
- [ ] 🔐 icon appears on password field
- [ ] Icon position is correct (inside field)
- [ ] Click icon suggests opening extension

### Auto-Fill Functionality
- [ ] Open extension on login page
- [ ] Saved credentials appear
- [ ] Click credential fills fields
- [ ] Username/email fills correctly
- [ ] Password fills correctly
- [ ] Form submit button enables
- [ ] Notification appears on auto-fill

## Biometric Tests (if device supports)
- [ ] Open settings page
- [ ] Enable biometric checkbox appears
- [ ] Check "Enable Biometric" works
- [ ] Browser prompts for biometric setup
- [ ] Setup completes successfully
- [ ] Credential ID stored

### Biometric Unlock
- [ ] Lock vault
- [ ] "Unlock with Biometric" button visible
- [ ] Click button prompts for biometric
- [ ] Fingerprint/Face ID unlocks vault
- [ ] Fallback to password works
- [ ] Error handling for failed auth

## Settings/Options Tests
- [ ] Click gear icon opens settings
- [ ] Settings page loads
- [ ] All sections display

### Auto-Lock Timeout
- [ ] Timeout dropdown shows options
- [ ] Select 1 minute saves
- [ ] Select 5 minutes saves
- [ ] Select 15 minutes saves
- [ ] Select 30 minutes saves
- [ ] Select 1 hour saves
- [ ] Setting persists after close

### Change Master Password
- [ ] "Change Master Password" opens modal
- [ ] Current password required
- [ ] New password required
- [ ] Confirmation required
- [ ] Mismatched passwords rejected
- [ ] Incorrect current password rejected
- [ ] Successful change re-encrypts data
- [ ] Can unlock with new password
- [ ] Old password doesn't work

### Export Data
- [ ] "Export Data" downloads file
- [ ] File is JSON format
- [ ] File contains encrypted data
- [ ] File includes version and timestamp
- [ ] No plaintext passwords in file

### Import Data
- [ ] "Import Data" opens file picker
- [ ] Select valid backup file
- [ ] Confirmation dialog appears
- [ ] Import replaces current data
- [ ] Imported passwords decrypt correctly
- [ ] Invalid file shows error

### Clear All Data
- [ ] "Clear All Data" shows warning
- [ ] Confirmation required (type DELETE)
- [ ] All data removed from storage
- [ ] Extension resets to initial state
- [ ] Setup required again

## Storage/Encryption Tests
- [ ] Open browser DevTools
- [ ] Check chrome.storage.local
- [ ] masterPasswordHash exists (array)
- [ ] encryptedPasswords exists (object with encrypted, iv, salt)
- [ ] encryptedTOTP exists (if added)
- [ ] No plaintext passwords visible
- [ ] No plaintext TOTP secrets visible

## Lock/Unlock Tests
- [ ] Click "Lock" button
- [ ] Vault locks immediately
- [ ] Auth section shows
- [ ] Main section hides
- [ ] Password required to unlock
- [ ] Data cleared from memory

### Auto-Lock
- [ ] Set auto-lock to 1 minute
- [ ] Wait 1 minute without interaction
- [ ] Vault auto-locks
- [ ] Re-authentication required

## Keyboard Shortcut Tests
- [ ] Press Ctrl+Shift+P (Win/Linux)
- [ ] Press Cmd+Shift+P (Mac)
- [ ] Extension popup opens
- [ ] Works from any tab

## Context Menu Tests (if implemented)
- [ ] Right-click in password field
- [ ] "Generate Password" option appears
- [ ] Click generates and inserts password

## UI/UX Tests
- [ ] All buttons are clickable
- [ ] All inputs accept text
- [ ] Modals can be closed
- [ ] Tabs switch correctly
- [ ] Colors/gradients display properly
- [ ] Text is readable
- [ ] Icons display correctly
- [ ] No layout issues
- [ ] Responsive on different sizes

## Error Handling Tests
- [ ] Invalid JSON in storage handled
- [ ] Decryption errors handled
- [ ] Network unavailable (should work offline)
- [ ] Storage quota exceeded handled
- [ ] Invalid TOTP secret handled
- [ ] Invalid base32 handled

## Security Tests
- [ ] Master password never in console
- [ ] Master password never in storage
- [ ] Passwords encrypted in storage
- [ ] TOTP secrets encrypted in storage
- [ ] No XSS vulnerabilities
- [ ] No injection vulnerabilities
- [ ] CSP enforced
- [ ] No external resources loaded

## Performance Tests
- [ ] Extension loads quickly (< 1s)
- [ ] Popup opens quickly (< 500ms)
- [ ] Password generation is instant
- [ ] TOTP codes update smoothly
- [ ] Search is responsive
- [ ] No memory leaks
- [ ] No CPU spikes

## Cross-Browser Tests
- [ ] All features work in Chrome
- [ ] All features work in Edge
- [ ] All features work in Brave
- [ ] All features work in Firefox
- [ ] All features work in Opera

## Documentation Tests
- [ ] README.md is complete and accurate
- [ ] QUICKSTART.md is easy to follow
- [ ] INSTALLATION.md has clear steps
- [ ] CONTRIBUTING.md has guidelines
- [ ] SECURITY.md has policy
- [ ] All links work
- [ ] Screenshots display
- [ ] Code examples work

## Final Validation
- [ ] All requested features implemented
- [ ] No console errors
- [ ] No browser warnings
- [ ] Extension is stable
- [ ] Data persists across sessions
- [ ] Ready for production use

---

## Test Results

**Date Tested:** _____________

**Browser:** _____________

**Version:** _____________

**Tester:** _____________

**Overall Status:** ☐ Pass ☐ Fail

**Notes:**
___________________________________
___________________________________
___________________________________

---

**Made with 🔒 for your security and privacy**
