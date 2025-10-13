// Content script for Superbet.ro Tennis Live Betting
console.log('Superbet Tennis Live Extension loaded');

// Global variables
let isInitialized = false;
let tennisPanel = null;
let tennisButton = null;
let matchObserver = null;
let oddsTrackingInterval = null;
let trackedMatches = new Set();

// Function to initialize the extension
function initializeExtension() {
  if (isInitialized) return;
  
  console.log('Initializing Superbet Tennis Live Extension...');
  
  try {
    // Check if we're on the tennis live betting page
    if (window.location.href.includes('/pariuri-sportive/tenis/live')) {
      console.log('Tennis live betting page detected');
      initializeTennisLiveFeatures();
    } else if (window.location.href.includes('superbet.ro')) {
      console.log('Superbet.ro page detected, adding general features');
      addGeneralFeatures();
    }
    
    isInitialized = true;
  } catch (error) {
    console.error('Error initializing extension:', error);
  }
}

// Function to add tennis live betting specific features
function initializeTennisLiveFeatures() {
  console.log('Setting up tennis live betting features...');
  
  try {
    // Add tennis-specific UI elements
    addTennisLivePanel();
    addTennisLiveButton();
    
    // Start monitoring for tennis matches
    startTennisMatchMonitoring();
    
    // Removed automatic initial processing to prevent unnecessary reloading
    
  } catch (error) {
    console.error('Error setting up tennis features:', error);
  }
}

// Function to add tennis live betting panel
function addTennisLivePanel() {
  // Remove existing panel if any
  const existingPanel = document.getElementById('superbet-tennis-panel');
  if (existingPanel) {
    existingPanel.remove();
  }
  
  const panel = document.createElement('div');
  panel.id = 'superbet-tennis-panel';
  panel.innerHTML = `
    <div class="tennis-panel-header">
      <h3>🎾 Tennis Live</h3>
      <button id="close-panel" class="close-btn">×</button>
    </div>
    <div class="tennis-panel-content">
      <div class="match-counter">
        <span id="live-matches-count">0</span> live matches
      </div>
             <div class="quick-actions">
         <button id="refresh-matches" class="action-btn">Refresh</button>
         <button id="track-odds" class="action-btn">Track Odds</button>
         <button id="process-tennis-events" class="action-btn">Process Events</button>
         <button id="click-game-btn" class="action-btn">Click Game</button>
         <button id="click-odd-btn" class="action-btn">Click Odd</button>
                   <button id="click-primary-btn" class="action-btn">Click Primary</button>
          <button id="click-modal-footer-btn" class="action-btn">Click Modal Footer</button>
          <button id="navigate-open-bets-btn" class="action-btn">Go to Open Bets</button>
          <button id="click-bet-list-btn" class="action-btn">Click Bet List</button>
          <button id="click-green-btn" class="action-btn">Click Green Button</button>
       </div>
      <div id="matches-list" class="matches-list">
        <p class="loading">Loading tennis matches...</p>
      </div>
    </div>
  `;
  
  panel.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 320px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    display: none;
  `;
  
  document.body.appendChild(panel);
  tennisPanel = panel;
  
  // Add event listeners
  document.getElementById('close-panel').addEventListener('click', () => {
    panel.style.display = 'none';
  });
  
  document.getElementById('refresh-matches').addEventListener('click', () => {
    refreshTennisMatches();
  });
  
  document.getElementById('track-odds').addEventListener('click', () => {
    startOddsTracking();
  });

  document.getElementById('process-tennis-events').addEventListener('click', () => {
    processTennisLiveEvents();
  });

  document.getElementById('click-game-btn').addEventListener('click', () => {
    clickGameButton();
  });

  document.getElementById('click-odd-btn').addEventListener('click', () => {
    clickFirstOddButton();
  });

  document.getElementById('click-primary-btn').addEventListener('click', () => {
    clickPrimaryElevationButton();
  });

  document.getElementById('click-modal-footer-btn').addEventListener('click', () => {
    clickModalFooterPrimaryButton();
  });

  document.getElementById('navigate-open-bets-btn').addEventListener('click', () => {
    navigateToMyOpenBets();
  });

  document.getElementById('click-bet-list-btn').addEventListener('click', () => {
    clickBetListItemPrimaryButton();
  });

  document.getElementById('click-green-btn').addEventListener('click', () => {
    clickGreenPrimaryButton();
  });
}

// Function to add tennis live button
function addTennisLiveButton() {
  // Remove existing button if any
  const existingButton = document.getElementById('superbet-tennis-btn');
  if (existingButton) {
    existingButton.remove();
  }
  
  const button = document.createElement('button');
  button.id = 'superbet-tennis-btn';
  button.innerHTML = '🎾 Tennis Live';
  button.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10001;
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    color: white;
    border: none;
    padding: 12px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  `;
  
  button.addEventListener('click', () => {
    const panel = document.getElementById('superbet-tennis-panel');
    if (panel && (panel.style.display === 'none' || !panel.style.display)) {
      panel.style.display = 'block';
      refreshTennisMatches();
    } else if (panel) {
      panel.style.display = 'none';
    }
  });
  
  document.body.appendChild(button);
  tennisButton = button;
}

// Function to start monitoring tennis matches
function startTennisMatchMonitoring() {
  console.log('Starting tennis match monitoring...');
  
  // Stop existing observer if any
  if (matchObserver) {
    matchObserver.disconnect();
  }
  
  // Monitor for tennis match elements
  matchObserver = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
                    if (node.querySelector && (
          node.querySelector('[data-sport="tennis"]') ||
          node.querySelector('.tennis-match') ||
          node.querySelector('.live-match') ||
          node.querySelector('.event-grid__events-container')
        )) {
          shouldUpdate = true;
          // Removed auto-processing to prevent unnecessary reloading
        }
          }
        });
      }
    });
    
    if (shouldUpdate) {
      console.log('DOM changes detected, updating matches...');
      setTimeout(() => {
        updateMatchesList();
      }, 500);
    }
  });
  
  matchObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Initial scan
  setTimeout(() => {
    updateMatchesList();
  }, 1000);
}

// Function to refresh tennis matches
function refreshTennisMatches() {
  console.log('Refreshing tennis matches...');
  updateMatchesList();
}

// Function to update matches list
function updateMatchesList() {
  const matchesList = document.getElementById('matches-list');
  if (!matchesList) return;
  
  try {
    // Look for tennis match elements on the page with multiple selectors
    const selectors = [
      '[data-sport="tennis"]',
      '.tennis-match',
      '.live-match',
      '.event-grid__events-container .event-item',
      '.event-grid__events-container [data-sport="tennis"]',
      '.vue-recycle-scroller__item-view .event-grid__events-container'
    ];
    
    let tennisMatches = [];
    selectors.forEach(selector => {
      const matches = document.querySelectorAll(selector);
      tennisMatches = tennisMatches.concat(Array.from(matches));
    });
    
    // Remove duplicates
    tennisMatches = [...new Set(tennisMatches)];
    
    if (tennisMatches.length === 0) {
      matchesList.innerHTML = '<p class="loading">No live tennis matches found</p>';
      const countElement = document.getElementById('live-matches-count');
      if (countElement) countElement.textContent = '0';
      return;
    }
    
    const countElement = document.getElementById('live-matches-count');
    if (countElement) countElement.textContent = tennisMatches.length;
    
    let matchesHTML = '';
    tennisMatches.forEach((match, index) => {
      // Try multiple selectors for match title
      const titleSelectors = [
        '.match-title',
        '.player-names',
        '.event-title',
        'h3',
        'h4',
        '.event-name',
        '[data-testid="event-name"]'
      ];
      
      let matchTitle = `Match ${index + 1}`;
      for (const selector of titleSelectors) {
        const titleElement = match.querySelector(selector);
        if (titleElement && titleElement.textContent.trim()) {
          matchTitle = titleElement.textContent.trim();
          break;
        }
      }
      
      // Try multiple selectors for score
      const scoreSelectors = [
        '.score',
        '.match-score',
        '.event-score',
        '.live-score'
      ];
      
      let score = 'Live';
      for (const selector of scoreSelectors) {
        const scoreElement = match.querySelector(selector);
        if (scoreElement && scoreElement.textContent.trim()) {
          score = scoreElement.textContent.trim();
          break;
        }
      }
      
      const isTracked = trackedMatches.has(index);
      
      matchesHTML += `
        <div class="match-item">
          <div class="match-title">${matchTitle}</div>
          <div class="match-score">${score}</div>
          <button class="track-match-btn ${isTracked ? 'tracked' : ''}" data-match="${index}">
            ${isTracked ? 'Untrack' : 'Track'}
          </button>
        </div>
      `;
    });
    
    matchesList.innerHTML = matchesHTML;
    
    // Add event listeners to track buttons
    matchesList.querySelectorAll('.track-match-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const matchIndex = parseInt(e.target.dataset.match);
        trackSpecificMatch(matchIndex);
      });
    });
    
  } catch (error) {
    console.error('Error updating matches list:', error);
    matchesList.innerHTML = '<p class="error">Error loading matches</p>';
  }
}

// Function to track specific match
function trackSpecificMatch(matchIndex) {
  console.log(`Tracking match ${matchIndex}`);
  
  if (trackedMatches.has(matchIndex)) {
    trackedMatches.delete(matchIndex);
    console.log(`Stopped tracking match ${matchIndex}`);
  } else {
    trackedMatches.add(matchIndex);
    console.log(`Started tracking match ${matchIndex}`);
  }
  
  // Update the UI
  updateMatchesList();
  
  // Show notification
  showNotification(`Match ${matchIndex + 1} ${trackedMatches.has(matchIndex) ? 'tracking started' : 'tracking stopped'}`);
}

// Function to start odds tracking
function startOddsTracking() {
  console.log('Starting odds tracking...');
  
  if (oddsTrackingInterval) {
    clearInterval(oddsTrackingInterval);
    oddsTrackingInterval = null;
    showNotification('Odds tracking stopped');
    return;
  }
  
  // Only start tracking if there are tracked matches
  if (trackedMatches.size > 0) {
    oddsTrackingInterval = setInterval(() => {
      if (trackedMatches.size > 0) {
        console.log('Tracking odds for', trackedMatches.size, 'matches');
        // Here you would implement actual odds tracking logic
        // For now, just log the activity
      } else {
        // Stop tracking if no matches are tracked
        clearInterval(oddsTrackingInterval);
        oddsTrackingInterval = null;
        showNotification('Odds tracking stopped - no matches tracked');
      }
    }, 5000); // Check every 5 seconds
    
    showNotification('Odds tracking started');
  } else {
    showNotification('No matches tracked - please track matches first');
  }
}

// Function to add general features for other pages
function addGeneralFeatures() {
  const button = document.createElement('button');
  button.textContent = 'Superbet Extension';
  button.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    color: white;
    border: none;
    padding: 12px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  `;
  
  button.addEventListener('click', () => {
    console.log('Extension button clicked!');
    showNotification('Superbet Extension is active');
  });
  
  document.body.appendChild(button);
}

// Function to find and click the "Game" button
function clickGameButton() {
  console.log('Looking for "Game" button...');
  
  try {
    // Find all buttons with the specified class
    const filterButtons = document.querySelectorAll('.sds-filter-bar-item--brand');
    console.log(`Found ${filterButtons.length} filter buttons`);
    
    let gameButtonFound = false;
    filterButtons.forEach((button, index) => {
      if (button.textContent && button.textContent.trim() === 'Game') {
        console.log(`Found "Game" button at index ${index}`);
        button.click();
        gameButtonFound = true;
        showNotification('Clicked "Game" button');
        
        // Automatically continue to next step after Game button is clicked
        setTimeout(() => {
          clickFirstOddButton();
        }, 2000); // Wait 2 seconds for the page to update after clicking Game button
      }
    });
    
    if (!gameButtonFound) {
      console.log('No "Game" button found');
      // Even if Game button not found, continue with the sequence
      setTimeout(() => {
        clickFirstOddButton();
      }, 2000);
    }
    
  } catch (error) {
    console.error('Error clicking Game button:', error);
    // Continue with sequence even if there's an error
    setTimeout(() => {
      clickFirstOddButton();
    }, 2000);
  }
}

// Function to find and click the first odd button
function clickFirstOddButton() {
  console.log('Looking for odd buttons...');
  
  try {
    // Find all divs with the specified class
    const oddButtons = document.querySelectorAll('.odd-button__inner');
    console.log(`Found ${oddButtons.length} odd buttons`);
    
    if (oddButtons.length > 0) {
      const firstOddButton = oddButtons[0];
      console.log('Clicking first odd button');
      firstOddButton.click();
      showNotification('Clicked first odd button');
      
      // Automatically continue to next step after odd button is clicked
      setTimeout(() => {
        clickPrimaryElevationButton();
      }, 1000); // Wait 1 second for the page to update after clicking odd button
    } else {
      console.log('No odd buttons found');
      // Continue with sequence even if no odd buttons found
      setTimeout(() => {
        clickPrimaryElevationButton();
      }, 1000);
    }
    
  } catch (error) {
    console.error('Error clicking odd button:', error);
    // Continue with sequence even if there's an error
    setTimeout(() => {
      clickPrimaryElevationButton();
    }, 1000);
  }
}

// Function to find and click the primary elevation button
function clickPrimaryElevationButton() {
  console.log('Looking for primary elevation button...');
  
  try {
    // Find all buttons with the specified class
    const primaryButtons = document.querySelectorAll('.sds-button--primary-elevation');
    console.log(`Found ${primaryButtons.length} primary elevation buttons`);
    
    if (primaryButtons.length > 0) {
      const primaryButton = primaryButtons[0];
      console.log('Clicking primary elevation button');
      primaryButton.click();
      showNotification('Clicked primary elevation button');
      
      // Automatically continue to next step after primary elevation button is clicked
      setTimeout(() => {
        clickModalFooterPrimaryButton();
      }, 1000); // Wait 1 second for the page to update after clicking primary elevation button
    } else {
      console.log('No primary elevation buttons found');
      // Continue with sequence even if no primary buttons found
      setTimeout(() => {
        clickModalFooterPrimaryButton();
      }, 1000);
    }
    
  } catch (error) {
    console.error('Error clicking primary elevation button:', error);
    // Continue with sequence even if there's an error
    setTimeout(() => {
      clickModalFooterPrimaryButton();
    }, 1000);
  }
}

// Function to find and click the primary elevation button in modal footer
function clickModalFooterPrimaryButton() {
  console.log('Looking for modal footer primary button...');
  
  try {
    // Find the modal footer element first
    const modalFooter = document.querySelector('.modal-footer--stacked');
    if (!modalFooter) {
      console.log('No modal footer found');
      // Continue with sequence even if no modal footer found
      setTimeout(() => {
        navigateToMyOpenBets();
      }, 1000);
      return;
    }
    
    // Find the primary elevation button within the modal footer
    const modalPrimaryButton = modalFooter.querySelector('.sds-button--primary-elevation');
    console.log(`Found ${modalPrimaryButton ? 1 : 0} primary elevation button in modal footer`);
    
    if (modalPrimaryButton) {
      console.log('Clicking modal footer primary elevation button');
      modalPrimaryButton.click();
      showNotification('Clicked modal footer primary button');
      
      // Automatically continue to next step after modal footer button is clicked
      setTimeout(() => {
        navigateToMyOpenBets();
      }, 1000); // Wait 1 second for the page to update after clicking modal footer button
    } else {
      console.log('No primary elevation button found in modal footer');
      // Continue with sequence even if no primary button found in modal footer
      setTimeout(() => {
        navigateToMyOpenBets();
      }, 1000);
    }
    
  } catch (error) {
    console.error('Error clicking modal footer primary button:', error);
    // Continue with sequence even if there's an error
    setTimeout(() => {
      navigateToMyOpenBets();
    }, 1000);
  }
}

// Function to navigate to My Open Bets page
function navigateToMyOpenBets() {
  console.log('Navigating to My Open Bets page...');
  
  try {
    // Navigate to the My Open Bets page
    window.location.href = 'https://superbet.ro/pariurile-mele/deschise';
    showNotification('Navigating to My Open Bets page');
    
    // After navigation, wait for page to load and click the bet list item primary button
    setTimeout(() => {
      clickBetListItemPrimaryButton();
    }, 3000); // Wait 3 seconds for the page to load after navigation
  } catch (error) {
    console.error('Error navigating to My Open Bets page:', error);
    // Continue with sequence even if there's an error
    setTimeout(() => {
      clickBetListItemPrimaryButton();
    }, 3000);
  }
}

// Function to find and click the primary elevation button in bet list item
function clickBetListItemPrimaryButton() {
  console.log('Looking for bet list item primary button...');
  
  try {
    // Find the bet list item element first
    const betListItem = document.querySelector('.bet-list-item');
    if (!betListItem) {
      console.log('No bet list item found');
      // Continue with sequence even if no bet list item found
      setTimeout(() => {
        clickGreenPrimaryButton();
      }, 2000);
      return;
    }
    
    // Find the primary elevation button within the bet list item
    const betListPrimaryButton = betListItem.querySelector('.sds-button--primary-elevation');
    console.log(`Found ${betListPrimaryButton ? 1 : 0} primary elevation button in bet list item`);
    
    if (betListPrimaryButton) {
      console.log('Clicking bet list item primary elevation button');
      betListPrimaryButton.click();
      showNotification('Clicked bet list item primary button');
      
      // Automatically continue to next step after bet list item button is clicked
      setTimeout(() => {
        clickGreenPrimaryButton();
      }, 2000); // Wait 2 seconds for the green button to appear after clicking bet list item
    } else {
      console.log('No primary elevation button found in bet list item');
      // Continue with sequence even if no primary button found in bet list item
      setTimeout(() => {
        clickGreenPrimaryButton();
      }, 2000);
    }
    
  } catch (error) {
    console.error('Error clicking bet list item primary button:', error);
    // Continue with sequence even if there's an error
    setTimeout(() => {
      clickGreenPrimaryButton();
    }, 2000);
  }
}

// Function to find and click the green primary elevation button
function clickGreenPrimaryButton() {
  console.log('Looking for green primary elevation button...');
  
  try {
    // Find all primary elevation buttons on the page
    const primaryButtons = document.querySelectorAll('.sds-button--primary-elevation');
    console.log(`Found ${primaryButtons.length} primary elevation buttons`);
    
    // Look for the green button (usually the second one or the one that appears after the first click)
    let greenButton = null;
    
    // Try to find the green button by looking for specific characteristics
    // This might need adjustment based on the actual page structure
    for (let i = 0; i < primaryButtons.length; i++) {
      const button = primaryButtons[i];
      const computedStyle = window.getComputedStyle(button);
      const backgroundColor = computedStyle.backgroundColor;
      const color = computedStyle.color;
      
      // Check if it's a green button (you might need to adjust these conditions)
      if (backgroundColor.includes('rgb(34, 197, 94)') || // green-500
          backgroundColor.includes('rgb(22, 163, 74)') || // green-600
          backgroundColor.includes('rgb(21, 128, 61)') || // green-700
          button.textContent.toLowerCase().includes('confirm') ||
          button.textContent.toLowerCase().includes('accept') ||
          button.textContent.toLowerCase().includes('yes')) {
        greenButton = button;
        break;
      }
    }
    
    // If no specific green button found, try the second primary elevation button
    if (!greenButton && primaryButtons.length > 1) {
      greenButton = primaryButtons[1]; // Second button
    }
    
    if (greenButton) {
      console.log('Clicking green primary elevation button');
      greenButton.click();
      showNotification('Clicked green primary elevation button');
      
      // Complete the automated sequence
      setTimeout(() => {
        showNotification('🎉 Automated sequence completed successfully!');
        console.log('Automated sequence completed successfully!');
      }, 1000);
    } else {
      console.log('No green primary elevation button found');
      // Complete the sequence even if no green button found
      setTimeout(() => {
        showNotification('🎉 Automated sequence completed! (Green button not found)');
        console.log('Automated sequence completed! (Green button not found)');
      }, 1000);
    }
    
  } catch (error) {
    console.error('Error clicking green primary elevation button:', error);
    // Complete the sequence even if there's an error
    setTimeout(() => {
      showNotification('🎉 Automated sequence completed! (Error on final step)');
      console.log('Automated sequence completed! (Error on final step)');
    }, 1000);
  }
}

// Function to process tennis live events
function processTennisLiveEvents() {
  console.log('Processing tennis live events...');
  
  try {
    // Start the complete automated sequence
    startAutomatedSequence();
    
    // Find all event-grid__events-container elements
    const eventsContainers = document.querySelectorAll('.event-grid__events-container');
    console.log(`Found ${eventsContainers.length} events containers`);
    
    let processedCount = 0;
    eventsContainers.forEach((container, containerIndex) => {
      try {
        // Find the first event-row-container
        const firstEventRow = container.querySelector('.event-row-container');
        if (!firstEventRow) {
          console.log(`No event-row-container found in container ${containerIndex}`);
          return;
        }
        
        // Find the event-card within the first event-row-container
        const eventCard = firstEventRow.querySelector('.event-card');
        if (!eventCard) {
          console.log(`No event-card found in container ${containerIndex}`);
          return;
        }
        
        // Find the event-card__main-content
        const mainContent = eventCard.querySelector('.event-card__main-content');
        if (!mainContent) {
          console.log(`No event-card__main-content found in container ${containerIndex}`);
          return;
        }
        
        // Find the event div to click
        const eventDiv = mainContent.querySelector('.event');
        if (!eventDiv) {
          console.log(`No event div found in container ${containerIndex}`);
          return;
        }
        
        // Click on the event div
        console.log(`Clicking event in container ${containerIndex}`);
        eventDiv.click();
        processedCount++;
        
      } catch (error) {
        console.error(`Error processing container ${containerIndex}:`, error);
      }
    });
    
    console.log(`Processed ${processedCount} tennis events`);
    showNotification(`Processed ${processedCount} tennis events`);
    
  } catch (error) {
    console.error('Error processing tennis events:', error);
    showNotification('Error processing tennis events');
  }
}

// Function to start the complete automated sequence
function startAutomatedSequence() {
  console.log('Starting complete automated sequence...');
  showNotification('Starting automated sequence...');
  
  // Step 1: Click Game Button
  setTimeout(() => {
    clickGameButton();
  }, 1000); // Start after 1 second
}



// Function to show notifications
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    z-index: 10002;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in content script:', request);
  
  try {
    if (request.action === 'getPageData') {
      // Extract relevant data from the page
      const pageData = {
        url: window.location.href,
        title: document.title,
        timestamp: new Date().toISOString(),
        isTennisLive: window.location.href.includes('/pariuri-sportive/tenis/live'),
        liveMatches: document.querySelectorAll('[data-sport="tennis"], .tennis-match, .live-match').length,
        trackedMatches: trackedMatches.size
      };
      
      sendResponse(pageData);
    }
    
    if (request.action === 'refreshMatches') {
      refreshTennisMatches();
      sendResponse({ success: true });
    }

    if (request.action === 'processTennisLiveEvents') {
      processTennisLiveEvents();
      sendResponse({ success: true });
    }

    if (request.action === 'openTennisPanel') {
      const panel = document.getElementById('superbet-tennis-panel');
      if (panel) {
        panel.style.display = 'block';
        refreshTennisMatches();
      }
      sendResponse({ success: true });
    }

    if (request.action === 'clickGame') {
      clickGameButton();
      sendResponse({ success: true });
    }

    if (request.action === 'clickOdd') {
      clickFirstOddButton();
      sendResponse({ success: true });
    }

    if (request.action === 'clickPrimary') {
      clickPrimaryElevationButton();
      sendResponse({ success: true });
    }

    if (request.action === 'clickModalFooter') {
      clickModalFooterPrimaryButton();
      sendResponse({ success: true });
    }

    if (request.action === 'navigateOpenBets') {
      navigateToMyOpenBets();
      sendResponse({ success: true });
    }

    if (request.action === 'clickBetList') {
      clickBetListItemPrimaryButton();
      sendResponse({ success: true });
    }

    if (request.action === 'clickGreen') {
      clickGreenPrimaryButton();
      sendResponse({ success: true });
    }

    
  } catch (error) {
    console.error('Error handling message:', error);
    sendResponse({ error: error.message });
  }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}

// Re-initialize on page changes (for SPA navigation) - Simplified to prevent unnecessary reloading
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    console.log('URL changed, re-initializing extension');
    // Only re-initialize if not already initialized
    if (!isInitialized) {
      initializeExtension();
    }
  }
}).observe(document, { subtree: true, childList: true }); 