// Encryption utilities
class CryptoUtils {
  static async deriveKey(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }

  static async encrypt(data, password) {
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await this.deriveKey(password, salt);

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      enc.encode(JSON.stringify(data))
    );

    return {
      encrypted: Array.from(new Uint8Array(encrypted)),
      iv: Array.from(iv),
      salt: Array.from(salt)
    };
  }

  static async decrypt(encryptedData, password) {
    const dec = new TextDecoder();
    const key = await this.deriveKey(password, new Uint8Array(encryptedData.salt));

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(encryptedData.iv) },
      key,
      new Uint8Array(encryptedData.encrypted)
    );

    return JSON.parse(dec.decode(decrypted));
  }
}

// Password Generator
class PasswordGenerator {
  static generate(length = 16, options = {}) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (options.uppercase !== false) chars += uppercase;
    if (options.lowercase !== false) chars += lowercase;
    if (options.numbers !== false) chars += numbers;
    if (options.symbols !== false) chars += symbols;

    if (!chars) chars = lowercase + numbers;

    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      password += chars[array[i] % chars.length];
    }

    return password;
  }

  static calculateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (password.length >= 16) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 3) return { level: 'weak', text: 'Weak Password' };
    if (strength <= 5) return { level: 'medium', text: 'Medium Password' };
    return { level: 'strong', text: 'Strong Password' };
  }
}

// TOTP Generator
class TOTPGenerator {
  static async generateTOTP(secret) {
    const key = this.base32Decode(secret.replace(/\s/g, '').toUpperCase());
    const epoch = Math.floor(Date.now() / 1000);
    const time = Math.floor(epoch / 30);
    const timeBuffer = new ArrayBuffer(8);
    const timeView = new DataView(timeBuffer);
    timeView.setUint32(4, time);

    const keyBuffer = new Uint8Array(key).buffer;
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'HMAC', hash: 'SHA-1' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, timeBuffer);
    const signatureArray = new Uint8Array(signature);
    const offset = signatureArray[19] & 0xf;
    const code = (
      ((signatureArray[offset] & 0x7f) << 24) |
      ((signatureArray[offset + 1] & 0xff) << 16) |
      ((signatureArray[offset + 2] & 0xff) << 8) |
      (signatureArray[offset + 3] & 0xff)
    ) % 1000000;

    return code.toString().padStart(6, '0');
  }

  static base32Decode(base32) {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    let value = 0;

    for (let i = 0; i < base32.length; i++) {
      const val = base32Chars.indexOf(base32[i]);
      if (val === -1) continue;
      bits += val.toString(2).padStart(5, '0');
    }

    const bytes = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) {
      bytes.push(parseInt(bits.substr(i, 8), 2));
    }

    return bytes;
  }

  static getTimeRemaining() {
    return 30 - (Math.floor(Date.now() / 1000) % 30);
  }
}

// Main App
class SecurePassVault {
  constructor() {
    this.isUnlocked = false;
    this.masterPassword = null;
    this.passwords = [];
    this.totpCodes = [];
    this.init();
  }

  async init() {
    await this.checkSetup();
    this.setupEventListeners();
  }

  async checkSetup() {
    const result = await chrome.storage.local.get(['masterPasswordHash', 'isSetup']);
    if (!result.isSetup) {
      this.showSetupModal();
    }
  }

  setupEventListeners() {
    // Auth
    document.getElementById('unlock-btn').addEventListener('click', () => this.unlock());
    document.getElementById('master-password').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.unlock();
    });
    document.getElementById('biometric-btn').addEventListener('click', () => this.unlockWithBiometric());
    document.getElementById('setup-link').addEventListener('click', () => this.showSetupModal());
    document.getElementById('lock-btn').addEventListener('click', () => this.lock());

    // Setup
    document.getElementById('setup-save-btn').addEventListener('click', () => this.setupMasterPassword());

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
    });

    // Password Generator
    document.getElementById('generate-btn').addEventListener('click', () => this.generatePassword());
    document.getElementById('password-length').addEventListener('input', (e) => {
      document.getElementById('length-value').textContent = e.target.value;
    });
    document.getElementById('copy-password-btn').addEventListener('click', () => this.copyGeneratedPassword());

    // Password Management
    document.getElementById('add-password-btn').addEventListener('click', () => this.showAddPasswordModal());
    document.getElementById('save-password-btn').addEventListener('click', () => this.savePassword());
    document.getElementById('cancel-password-btn').addEventListener('click', () => this.hideAddPasswordModal());
    document.getElementById('use-generated-btn').addEventListener('click', () => this.useGeneratedPassword());
    document.getElementById('search-passwords').addEventListener('input', (e) => this.searchPasswords(e.target.value));

    // TOTP
    document.getElementById('add-totp-btn').addEventListener('click', () => this.showAddTOTPModal());
    document.getElementById('save-totp-btn').addEventListener('click', () => this.saveTOTP());
    document.getElementById('cancel-totp-btn').addEventListener('click', () => this.hideAddTOTPModal());

    // Settings
    document.getElementById('settings-btn').addEventListener('click', () => this.openSettings());
  }

  async setupMasterPassword() {
    const password = document.getElementById('new-master-password').value;
    const confirm = document.getElementById('confirm-master-password').value;

    if (!password || password !== confirm) {
      alert('Passwords do not match!');
      return;
    }

    if (password.length < 8) {
      alert('Master password must be at least 8 characters!');
      return;
    }

    const hash = await this.hashPassword(password);
    await chrome.storage.local.set({ masterPasswordHash: hash, isSetup: true });
    
    document.getElementById('setup-modal').classList.add('hidden');
    alert('Master password created successfully!');
  }

  async hashPassword(password) {
    const enc = new TextEncoder();
    const hash = await crypto.subtle.digest('SHA-256', enc.encode(password));
    return Array.from(new Uint8Array(hash));
  }

  async unlock() {
    const password = document.getElementById('master-password').value;
    const result = await chrome.storage.local.get(['masterPasswordHash']);
    
    const hash = await this.hashPassword(password);
    const storedHash = result.masterPasswordHash;

    if (JSON.stringify(hash) === JSON.stringify(storedHash)) {
      this.isUnlocked = true;
      this.masterPassword = password;
      await this.loadData();
      this.showMainSection();
    } else {
      alert('Incorrect password!');
    }
  }

  async unlockWithBiometric() {
    try {
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: crypto.getRandomValues(new Uint8Array(32)),
          timeout: 60000,
          userVerification: 'required'
        }
      });

      if (credential) {
        const result = await chrome.storage.local.get(['masterPassword']);
        if (result.masterPassword) {
          this.masterPassword = result.masterPassword;
          this.isUnlocked = true;
          await this.loadData();
          this.showMainSection();
        } else {
          alert('Biometric authentication not set up. Please unlock with password first.');
        }
      }
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      alert('Biometric authentication failed. Please use your master password.');
    }
  }

  async loadData() {
    const result = await chrome.storage.local.get(['encryptedPasswords', 'encryptedTOTP']);
    
    if (result.encryptedPasswords) {
      try {
        this.passwords = await CryptoUtils.decrypt(result.encryptedPasswords, this.masterPassword);
      } catch (error) {
        console.error('Failed to decrypt passwords:', error);
        this.passwords = [];
      }
    }

    if (result.encryptedTOTP) {
      try {
        this.totpCodes = await CryptoUtils.decrypt(result.encryptedTOTP, this.masterPassword);
      } catch (error) {
        console.error('Failed to decrypt TOTP codes:', error);
        this.totpCodes = [];
      }
    }

    this.renderPasswords();
    this.renderTOTP();
  }

  async saveData() {
    const encryptedPasswords = await CryptoUtils.encrypt(this.passwords, this.masterPassword);
    const encryptedTOTP = await CryptoUtils.encrypt(this.totpCodes, this.masterPassword);
    
    await chrome.storage.local.set({
      encryptedPasswords,
      encryptedTOTP
    });
  }

  showMainSection() {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('main-section').classList.remove('hidden');
  }

  showSetupModal() {
    document.getElementById('setup-modal').classList.remove('hidden');
  }

  lock() {
    this.isUnlocked = false;
    this.masterPassword = null;
    this.passwords = [];
    this.totpCodes = [];
    document.getElementById('main-section').classList.add('hidden');
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('master-password').value = '';
  }

  switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.remove('hidden');
  }

  generatePassword() {
    const length = parseInt(document.getElementById('password-length').value);
    const options = {
      uppercase: document.getElementById('include-uppercase').checked,
      lowercase: document.getElementById('include-lowercase').checked,
      numbers: document.getElementById('include-numbers').checked,
      symbols: document.getElementById('include-symbols').checked
    };

    const password = PasswordGenerator.generate(length, options);
    document.getElementById('generated-password').value = password;

    const strength = PasswordGenerator.calculateStrength(password);
    const strengthDiv = document.getElementById('password-strength');
    strengthDiv.textContent = strength.text;
    strengthDiv.className = `strength-${strength.level}`;
  }

  async copyGeneratedPassword() {
    const password = document.getElementById('generated-password').value;
    if (password) {
      await navigator.clipboard.writeText(password);
      const btn = document.getElementById('copy-password-btn');
      btn.textContent = '✓';
      setTimeout(() => btn.textContent = '📋', 1000);
    }
  }

  useGeneratedPassword() {
    const generatedPassword = document.getElementById('generated-password').value;
    if (generatedPassword) {
      document.getElementById('password').value = generatedPassword;
    } else {
      alert('Please generate a password first!');
    }
  }

  showAddPasswordModal() {
    document.getElementById('add-password-modal').classList.remove('hidden');
  }

  hideAddPasswordModal() {
    document.getElementById('add-password-modal').classList.add('hidden');
    this.clearPasswordForm();
  }

  clearPasswordForm() {
    document.getElementById('site-url').value = '';
    document.getElementById('site-name').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  }

  async savePassword() {
    const password = {
      id: Date.now(),
      url: document.getElementById('site-url').value,
      name: document.getElementById('site-name').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      createdAt: new Date().toISOString()
    };

    if (!password.name || !password.username || !password.password) {
      alert('Please fill in all required fields!');
      return;
    }

    this.passwords.push(password);
    await this.saveData();
    this.renderPasswords();
    this.hideAddPasswordModal();
  }

  searchPasswords(query) {
    const filtered = this.passwords.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.username.toLowerCase().includes(query.toLowerCase()) ||
      (p.url && p.url.toLowerCase().includes(query.toLowerCase()))
    );
    this.renderPasswords(filtered);
  }

  renderPasswords(passwordsToRender = null) {
    const list = document.getElementById('passwords-list');
    const passwords = passwordsToRender || this.passwords;
    
    if (passwords.length === 0) {
      list.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No passwords saved yet</p>';
      return;
    }

    list.innerHTML = passwords.map(p => `
      <div class="password-item" data-id="${p.id}">
        <h4>${p.name}</h4>
        <p>${p.username}</p>
        <p style="font-size: 11px; color: #999;">${p.url || 'No URL'}</p>
      </div>
    `).join('');

    list.querySelectorAll('.password-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        const password = this.passwords.find(p => p.id === id);
        this.showPasswordDetails(password);
      });
    });
  }

  async showPasswordDetails(password) {
    const copy = await confirm(`Copy password for ${password.name}?\n\nUsername: ${password.username}\nURL: ${password.url || 'N/A'}`);
    if (copy) {
      await navigator.clipboard.writeText(password.password);
      alert('Password copied to clipboard!');
      
      // Send message to content script to autofill
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'autofill',
            username: password.username,
            password: password.password
          });
        }
      });
    }
  }

  showAddTOTPModal() {
    document.getElementById('add-totp-modal').classList.remove('hidden');
  }

  hideAddTOTPModal() {
    document.getElementById('add-totp-modal').classList.add('hidden');
    document.getElementById('totp-name').value = '';
    document.getElementById('totp-secret').value = '';
  }

  async saveTOTP() {
    const totp = {
      id: Date.now(),
      name: document.getElementById('totp-name').value,
      secret: document.getElementById('totp-secret').value
    };

    if (!totp.name || !totp.secret) {
      alert('Please fill in all fields!');
      return;
    }

    this.totpCodes.push(totp);
    await this.saveData();
    this.renderTOTP();
    this.hideAddTOTPModal();
  }

  async renderTOTP() {
    const list = document.getElementById('totp-list');
    
    if (this.totpCodes.length === 0) {
      list.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No 2FA codes added yet</p>';
      return;
    }

    const renderCodes = async () => {
      const codes = await Promise.all(this.totpCodes.map(async t => {
        const code = await TOTPGenerator.generateTOTP(t.secret);
        const timeRemaining = TOTPGenerator.getTimeRemaining();
        return { ...t, code, timeRemaining };
      }));

      list.innerHTML = codes.map(t => `
        <div class="totp-item">
          <div>
            <h4>${t.name}</h4>
            <div class="totp-code">${t.code}</div>
          </div>
          <div class="totp-timer">${t.timeRemaining}s</div>
        </div>
      `).join('');

      list.querySelectorAll('.totp-item').forEach((item, index) => {
        item.addEventListener('click', async () => {
          await navigator.clipboard.writeText(codes[index].code);
          alert('2FA code copied to clipboard!');
        });
      });
    };

    await renderCodes();
    
    // Update every second
    setInterval(renderCodes, 1000);
  }

  openSettings() {
    chrome.runtime.openOptionsPage();
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SecurePassVault();
});
