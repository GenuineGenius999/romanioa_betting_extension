// Background service worker for Superbet Tennis Extension
console.log('Superbet Tennis Extension background script loaded');

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Superbet Tennis Extension installed');
  
  // Initialize default settings
  chrome.storage.local.set({
    enabled: true,
    settings: {
      oddsTracking: false,
      notifications: true
    }
  });
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in background script:', request);
  
  if (request.action === 'getSettings') {
    chrome.storage.local.get(['enabled', 'settings'], (result) => {
      sendResponse(result);
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'updateSettings') {
    chrome.storage.local.set({
      enabled: request.enabled,
      settings: request.settings
    }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'getPageData') {
    // Forward the request to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
          sendResponse(response);
        });
      }
    });
    return true;
  }
  
  if (request.action === 'refreshMatches') {
    // Forward the request to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
          sendResponse(response);
        });
      }
    });
    return true;
  }
  
  if (request.action === 'openTennisPanel') {
    // Forward the request to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
          sendResponse(response);
        });
      } else {
        sendResponse({ success: false, error: 'No active tab found' });
      }
    });
    return true;
  }

  if (request.action === 'clickGame') {
    // Forward the request to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
          sendResponse(response);
        });
      } else {
        sendResponse({ success: false, error: 'No active tab found' });
      }
    });
    return true;
  }

  if (request.action === 'clickOdd') {
    // Forward the request to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
          sendResponse(response);
        });
      } else {
        sendResponse({ success: false, error: 'No active tab found' });
      }
    });
    return true;
  }

  if (request.action === 'clickPrimary') {
    // Forward the request to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
          sendResponse(response);
        });
      } else {
        sendResponse({ success: false, error: 'No active tab found' });
      }
    });
    return true;
  }

  if (request.action === 'clickModalFooter') {
    // Forward the request to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
          sendResponse(response);
        });
      } else {
        sendResponse({ success: false, error: 'No active tab found' });
      }
    });
    return true;
  }

  if (request.action === 'navigateOpenBets') {
    // Forward the request to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
          sendResponse(response);
        });
      } else {
        sendResponse({ success: false, error: 'No active tab found' });
      }
    });
    return true;
  }

  if (request.action === 'clickBetList') {
    // Forward the request to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
          sendResponse(response);
        });
      } else {
        sendResponse({ success: false, error: 'No active tab found' });
      }
    });
    return true;
  }

  if (request.action === 'clickGreen') {
    // Forward the request to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
          sendResponse(response);
        });
      } else {
        sendResponse({ success: false, error: 'No active tab found' });
      }
    });
    return true;
  }


});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('superbet.ro')) {
    console.log('Superbet.ro page loaded:', tab.url);
    
    // Check if it's the tennis live page
    if (tab.url.includes('/pariuri-sportive/tenis/live')) {
      console.log('Tennis live betting page detected');
      
      // You can add functionality here that runs when the tennis live page loads
      // For example, you could inject additional scripts or send messages
    }
  }
});

// Listen for notifications (for future tennis match notifications)
chrome.notifications.onClicked.addListener((notificationId) => {
  console.log('Notification clicked:', notificationId);
  
  // Handle notification clicks
  if (notificationId.startsWith('tennis_match_')) {
    // Open the tennis live page when notification is clicked
    chrome.tabs.create({ url: 'https://superbet.ro/pariuri-sportive/tenis/live' });
  }
}); 