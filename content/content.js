// Content script for auto-fill functionality
(function() {
  'use strict';

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'autofill') {
      autofillCredentials(request.username, request.password);
      sendResponse({ success: true });
    }
  });

  function autofillCredentials(username, password) {
    // Find username/email field
    const usernameFields = document.querySelectorAll(
      'input[type="text"][name*="user"], input[type="text"][name*="email"], ' +
      'input[type="email"], input[type="text"][id*="user"], input[type="text"][id*="email"], ' +
      'input[name*="user"], input[name*="email"], input[id*="user"], input[id*="email"]'
    );

    // Find password field
    const passwordFields = document.querySelectorAll(
      'input[type="password"]'
    );

    if (usernameFields.length > 0 && username) {
      const usernameField = usernameFields[0];
      usernameField.value = username;
      usernameField.dispatchEvent(new Event('input', { bubbles: true }));
      usernameField.dispatchEvent(new Event('change', { bubbles: true }));
    }

    if (passwordFields.length > 0 && password) {
      const passwordField = passwordFields[0];
      passwordField.value = password;
      passwordField.dispatchEvent(new Event('input', { bubbles: true }));
      passwordField.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Show notification
    showNotification('Credentials auto-filled!');
  }

  function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #667eea;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Detect login forms and show extension icon
  function detectLoginForms() {
    const passwordFields = document.querySelectorAll('input[type="password"]');
    if (passwordFields.length > 0) {
      passwordFields.forEach(field => {
        if (!field.dataset.securePassIconAdded) {
          addSecurePassIcon(field);
          field.dataset.securePassIconAdded = 'true';
        }
      });
    }
  }

  function addSecurePassIcon(passwordField) {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position: relative; display: inline-block; width: 100%;';
    
    const icon = document.createElement('button');
    icon.innerHTML = '🔐';
    icon.title = 'Fill with Secure Pass Vault';
    icon.style.cssText = `
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      z-index: 1000;
      padding: 5px;
    `;

    icon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      chrome.runtime.sendMessage({ action: 'openPopup' });
    });

    if (passwordField.parentNode) {
      passwordField.parentNode.insertBefore(wrapper, passwordField);
      wrapper.appendChild(passwordField);
      wrapper.appendChild(icon);
    }
  }

  // Run detection on page load and when DOM changes
  detectLoginForms();
  
  const observer = new MutationObserver(detectLoginForms);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
