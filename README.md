## SecurePass (MV3) – Encrypted Password Manager Extension

SecurePass is a Chrome Manifest V3 extension that stores your passwords locally with strong client‑side encryption and can optionally sync the encrypted vault to Firebase so you can restore on another computer.

### Latest Release: v1.1 - Stability & Performance Update
**Recent fixes:**
- ✅ Fixed popup crashes during 2FA verification (async HMAC operations)
- ✅ Resolved scrolling issues across all screens and modals
- ✅ Eliminated layout glitches when opening extension
- ✅ Improved form state management and screen transitions
- ✅ Enhanced touch scrolling and mobile compatibility

### Key Features
- **Zero‑knowledge encryption**: AES‑GCM with unique salt/IV; master password never leaves your device
- **Account layer**: Email/Password signup or Google sign‑in (Firebase Auth)
- **Cross‑device restore**: Optional sync of encrypted vault to Firebase Realtime Database
- **Autofill helper**: Quick pick of matching credentials on login pages
- **Two-Factor Authentication**: TOTP support for enhanced security
- **Biometric unlock**: Platform authenticator support (Windows Hello, Touch ID, etc.)
- **Utilities**: Password generator and strength feedback

### Security Model (Important)
- Your vault entries are encrypted on device using your master password (PBKDF2 → AES‑GCM). Only encrypted blobs are stored.
- The master password (and raw passwords) are never uploaded. Cloud sync stores only encrypted data and the hash of the master password for local verification.
- If you forget your master password, existing encrypted entries cannot be recovered. You can reset the vault (local/cloud) and start fresh.

## How It Works
- **Auth layer**: Firebase Authentication (Email/Password and Google) identifies your account for optional cloud sync.
- **Master password**: Protects and encrypts your local vault. First‑time flow is: Sign Up → Create Master Password → Enter Master Password to unlock.
- **Storage**: By default data is stored in `chrome.storage.local`. If configured, the encrypted vault is mirrored to Firebase Realtime Database for restore on other devices.

## Project Structure
- `manifest.json` – MV3 config (action popup, service worker, permissions)
- `popup.html / popup.js / style.css` – UI and main app logic
- `content.js` – Autofill helper injected on pages
- `background.js` – Lifecycle events, messaging
- `crypto.js` – PBKDF2 + AES‑GCM crypto helpers
- `auth.js` – Pluggable auth (Firebase REST + Google via chrome.identity)
- `cloud.js` – Firebase Realtime Database REST client (encrypted vault sync)

## Prerequisites
- Chrome (or Chromium‑based) with Developer Mode
- Firebase project (free Spark plan is fine for dev)

## Firebase Setup (Free Tier)
1) Create a Firebase project at `https://console.firebase.google.com`
2) Authentication → Sign‑in method:
   - Enable **Email/Password**
   - Enable **Google** (optional for Gmail sign‑in)
3) Project Settings → General → Your apps → get the **Web API key**
4) Realtime Database → Create database → Note the database URL (e.g. `https://your-project-id-default-rtdb.firebaseio.com`)

## Configure the Extension
Edit the following files:

- `auth.js` – set your Firebase Web API key:

```js
// auth.js
const FIREBASE_API_KEY = "YOUR_FIREBASE_WEB_API_KEY";
```

- `cloud.js` – set your Firebase Realtime Database URL:

```js
// cloud.js
const FIREBASE_DATABASE_URL = "https://your-project-id-default-rtdb.firebaseio.com";
```

- `manifest.json` – add your OAuth2 client id (required for chrome.identity Google sign‑in):

```json
"oauth2": {
  "client_id": "REPLACE_WITH_YOUR_OAUTH_CLIENT_ID.apps.googleusercontent.com",
  "scopes": [
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}
```

Notes:
- The `identity` permission is already added. If Google sign‑in fails, verify the OAuth client is valid and the extension is reloaded after edits.
- For some Google Cloud setups, you may need to configure an OAuth consent screen and publish to production for all users.

## Load the Extension (Chrome)
1) Open `chrome://extensions`
2) Toggle **Developer mode** (top right)
3) Click **Load unpacked** and select the `securepass-extension` folder
4) Click the SecurePass icon in the toolbar to open the popup

## Usage
1) **Account**: Sign Up with Email/Password or **Sign in with Google**
2) **Create Master Password** (first time), then **Enter Master Password** to unlock
3) **Add passwords** (they’re encrypted using your master password)
4) On another computer: install the extension → sign in → the encrypted vault downloads → enter master password to unlock

### Reset/Recovery
- Use “Forgot account password” to send an email reset (Firebase Auth)
- Use “Reset Vault” to erase local data and optionally clear cloud sync data (irreversible)

## Permissions Explained
- `storage`: Save local encrypted data and settings
- `identity`: Get Google OAuth token for Google sign‑in (via chrome.identity)
- `activeTab`, `scripting`: Used by content script for autofill UI helpers

## Troubleshooting

### Common Issues
- **Google sign‑in fails**: Ensure `manifest.json` has a valid `oauth2.client_id` and you reloaded the extension. Confirm the OAuth consent screen and scopes in Google Cloud console.
- **Firebase errors**: Check `FIREBASE_API_KEY` and `FIREBASE_DATABASE_URL`. Verify Authentication providers are enabled and Realtime Database is created.
- **Restore not working**: Confirm you signed in to the same account and that `cloud.js` database URL is correct. The vault is uploaded after changes; try saving a small edit to trigger upload, then retry on the other device.
- **Extension popup freezes**: This was fixed in v1.1. Ensure you're running the latest version with async TOTP operations.
- **Scrolling not working**: Fixed in v1.1. Each screen and modal now has proper overflow handling and touch support.
- **Layout glitches on open**: Fixed in v1.1. Scrollbar gutters are now stable to prevent content jumps.

## Contributing / Custom Backend
- You can replace Firebase with your own backend by implementing the same methods in `auth.js` and `cloud.js`. The vault must remain encrypted client‑side.

## Changelog

### Version 1.1 (2025-10-09)
**Stability & Performance Improvements:**
- Fixed critical popup crash during 2FA operations (async HMAC-SHA1)
- Resolved all scrolling issues with proper touch support
- Eliminated layout glitches and viewport jumps
- Fixed CSS root selector and scrollbar gutter optimization
- Improved form state management across screen transitions
- Added toast notifications to prevent content reflow
- Enhanced content script unlock prompt with max-height scrolling
- Performance optimizations for crypto operations and screen rendering

### Version 1.0 (2025-10-04)
- Initial release with core password management features
- AES-GCM encryption, Firebase sync, autofill support
- Two-Factor Authentication (TOTP) and biometric unlock
- Master password management and vault reset

## License
Choose a license and add it here (e.g., MIT).


