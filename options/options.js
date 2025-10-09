// Options page functionality
class SettingsManager {
  constructor() {
    this.init();
  }

  async init() {
    await this.loadSettings();
    this.setupEventListeners();
  }

  async loadSettings() {
    const result = await chrome.storage.local.get(['autoLockTimeout', 'biometricEnabled']);
    
    document.getElementById('auto-lock-timeout').value = result.autoLockTimeout || 5;
    document.getElementById('biometric-enabled').checked = result.biometricEnabled || false;
  }

  setupEventListeners() {
    // Auto-lock timeout
    document.getElementById('auto-lock-timeout').addEventListener('change', async (e) => {
      await chrome.storage.local.set({ autoLockTimeout: parseInt(e.target.value) });
      this.showNotification('Auto-lock timeout updated');
    });

    // Biometric authentication
    document.getElementById('biometric-enabled').addEventListener('change', async (e) => {
      if (e.target.checked) {
        const enabled = await this.enableBiometric();
        if (!enabled) {
          e.target.checked = false;
          return;
        }
      }
      await chrome.storage.local.set({ biometricEnabled: e.target.checked });
      this.showNotification('Biometric authentication ' + (e.target.checked ? 'enabled' : 'disabled'));
    });

    // Change master password
    document.getElementById('change-master-password').addEventListener('click', () => {
      document.getElementById('change-password-modal').classList.remove('hidden');
    });

    document.getElementById('save-new-password').addEventListener('click', () => this.changeMasterPassword());
    document.getElementById('cancel-change-password').addEventListener('click', () => {
      document.getElementById('change-password-modal').classList.add('hidden');
    });

    // Export data
    document.getElementById('export-data').addEventListener('click', () => this.exportData());

    // Import data
    document.getElementById('import-data').addEventListener('click', () => {
      document.getElementById('import-file').click();
    });

    document.getElementById('import-file').addEventListener('change', (e) => this.importData(e));

    // Clear all data
    document.getElementById('clear-all-data').addEventListener('click', () => this.clearAllData());
  }

  async enableBiometric() {
    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        alert('Biometric authentication is not supported on this device');
        return false;
      }

      const challenge = crypto.getRandomValues(new Uint8Array(32));
      
      // Create credential
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: challenge,
          rp: {
            name: 'Secure Pass Vault'
          },
          user: {
            id: crypto.getRandomValues(new Uint8Array(16)),
            name: 'user@securepass.vault',
            displayName: 'Secure Pass User'
          },
          pubKeyCredParams: [
            { type: 'public-key', alg: -7 },  // ES256
            { type: 'public-key', alg: -257 } // RS256
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required'
          },
          timeout: 60000
        }
      });

      if (credential) {
        await chrome.storage.local.set({ biometricCredential: credential.id });
        return true;
      }
    } catch (error) {
      console.error('Biometric setup failed:', error);
      alert('Failed to set up biometric authentication. Make sure you have a biometric device configured.');
      return false;
    }
  }

  async changeMasterPassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    // Verify current password
    const currentHash = await this.hashPassword(currentPassword);
    const result = await chrome.storage.local.get(['masterPasswordHash', 'encryptedPasswords', 'encryptedTOTP']);
    
    if (JSON.stringify(currentHash) !== JSON.stringify(result.masterPasswordHash)) {
      alert('Current password is incorrect');
      return;
    }

    // Re-encrypt all data with new password
    try {
      if (result.encryptedPasswords) {
        const passwords = await this.decrypt(result.encryptedPasswords, currentPassword);
        const reencrypted = await this.encrypt(passwords, newPassword);
        await chrome.storage.local.set({ encryptedPasswords: reencrypted });
      }

      if (result.encryptedTOTP) {
        const totp = await this.decrypt(result.encryptedTOTP, currentPassword);
        const reencrypted = await this.encrypt(totp, newPassword);
        await chrome.storage.local.set({ encryptedTOTP: reencrypted });
      }

      // Update master password hash
      const newHash = await this.hashPassword(newPassword);
      await chrome.storage.local.set({ masterPasswordHash: newHash });

      document.getElementById('change-password-modal').classList.add('hidden');
      document.getElementById('current-password').value = '';
      document.getElementById('new-password').value = '';
      document.getElementById('confirm-password').value = '';

      this.showNotification('Master password changed successfully');
    } catch (error) {
      console.error('Failed to change password:', error);
      alert('Failed to change password. Please try again.');
    }
  }

  async hashPassword(password) {
    const enc = new TextEncoder();
    const hash = await crypto.subtle.digest('SHA-256', enc.encode(password));
    return Array.from(new Uint8Array(hash));
  }

  async deriveKey(password, salt) {
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

  async encrypt(data, password) {
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

  async decrypt(encryptedData, password) {
    const dec = new TextDecoder();
    const key = await this.deriveKey(password, new Uint8Array(encryptedData.salt));

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(encryptedData.iv) },
      key,
      new Uint8Array(encryptedData.encrypted)
    );

    return JSON.parse(dec.decode(decrypted));
  }

  async exportData() {
    const result = await chrome.storage.local.get(['encryptedPasswords', 'encryptedTOTP']);
    
    const exportData = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      passwords: result.encryptedPasswords || null,
      totp: result.encryptedTOTP || null
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `secure-pass-vault-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    this.showNotification('Data exported successfully');
  }

  async importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        
        if (!importData.version || !importData.passwords) {
          alert('Invalid backup file');
          return;
        }

        const confirm = window.confirm('This will replace your current passwords. Continue?');
        if (!confirm) return;

        await chrome.storage.local.set({
          encryptedPasswords: importData.passwords,
          encryptedTOTP: importData.totp
        });

        this.showNotification('Data imported successfully');
      } catch (error) {
        console.error('Import failed:', error);
        alert('Failed to import data. Invalid file format.');
      }
    };

    reader.readAsText(file);
    event.target.value = '';
  }

  async clearAllData() {
    const confirm = window.confirm(
      '⚠️ WARNING: This will permanently delete ALL your passwords, 2FA codes, and settings.\n\n' +
      'This action cannot be undone!\n\n' +
      'Type "DELETE" to confirm:'
    );

    if (confirm !== null) {
      const confirmText = prompt('Type "DELETE" to confirm:');
      if (confirmText === 'DELETE') {
        await chrome.storage.local.clear();
        this.showNotification('All data cleared');
        setTimeout(() => window.close(), 1000);
      }
    }
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #667eea;
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize settings manager
document.addEventListener('DOMContentLoaded', () => {
  new SettingsManager();
});
