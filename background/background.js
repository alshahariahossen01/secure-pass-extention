// Background service worker for Secure Pass Vault
chrome.runtime.onInstalled.addListener(() => {
  console.log('Secure Pass Vault installed');
  
  // Set up default settings
  chrome.storage.local.get(['isSetup'], (result) => {
    if (!result.isSetup) {
      chrome.storage.local.set({
        isSetup: false,
        autoLockTimeout: 5, // minutes
        biometricEnabled: false
      });
    }
  });
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openPopup') {
    chrome.action.openPopup();
  }
});

// Auto-lock functionality
let lockTimer = null;

function startAutoLockTimer() {
  chrome.storage.local.get(['autoLockTimeout'], (result) => {
    const timeout = (result.autoLockTimeout || 5) * 60 * 1000; // Convert to milliseconds
    
    if (lockTimer) {
      clearTimeout(lockTimer);
    }
    
    lockTimer = setTimeout(() => {
      chrome.storage.local.set({ isLocked: true });
    }, timeout);
  });
}

// Reset timer on user activity
chrome.tabs.onActivated.addListener(() => {
  startAutoLockTimer();
});

chrome.windows.onFocusChanged.addListener(() => {
  startAutoLockTimer();
});

// Context menu for password generation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'generate-password',
    title: 'Generate Password',
    contexts: ['editable']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'generate-password') {
    const password = generatePassword(16);
    chrome.tabs.sendMessage(tab.id, {
      action: 'insertPassword',
      password: password
    });
  }
});

function generatePassword(length = 16) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }
  
  return password;
}

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-vault') {
    chrome.action.openPopup();
  }
});
