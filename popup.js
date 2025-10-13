// Popup script for Superbet Tennis Extension
document.addEventListener('DOMContentLoaded', function () {
  console.log('Tennis Extension Popup loaded');

  // Get DOM elements
  const enableToggle = document.getElementById('enableToggle');
  const oddsTrackingToggle = document.getElementById('oddsTrackingToggle');
  const notificationsToggle = document.getElementById('notificationsToggle');
  const statusIndicator = document.getElementById('statusIndicator');
  const pageInfo = document.getElementById('pageInfo');
  const refreshBtn = document.getElementById('refreshBtn');
  const openPanelBtn = document.getElementById('openPanelBtn');
  const clickGameBtn = document.getElementById('clickGameBtn');
  const clickOddBtn = document.getElementById('clickOddBtn');
  const clickPrimaryBtn = document.getElementById('clickPrimaryBtn');
  const clickModalFooterBtn = document.getElementById('clickModalFooterBtn');
  const navigateOpenBetsBtn = document.getElementById('navigateOpenBetsBtn');
  const clickBetListBtn = document.getElementById('clickBetListBtn');
  const clickGreenBtn = document.getElementById('clickGreenBtn');
  const settingsBtn = document.getElementById('settingsBtn');

  // Load current settings
  loadSettings();

  // Load page information
  loadPageInfo();

  // Event listeners
  enableToggle.addEventListener('change', updateSettings);
  oddsTrackingToggle.addEventListener('change', updateSettings);
  notificationsToggle.addEventListener('change', updateSettings);
  refreshBtn.addEventListener('click', refreshMatches);
  openPanelBtn.addEventListener('click', openTennisPanel);
  clickGameBtn.addEventListener('click', clickGame);
  clickOddBtn.addEventListener('click', clickOdd);
  clickPrimaryBtn.addEventListener('click', clickPrimary);
  clickModalFooterBtn.addEventListener('click', clickModalFooter);
  navigateOpenBetsBtn.addEventListener('click', navigateOpenBets);
  clickBetListBtn.addEventListener('click', clickBetList);
  clickGreenBtn.addEventListener('click', clickGreen);
  settingsBtn.addEventListener('click', openSettings);

  // Function to load settings
  function loadSettings() {
    chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
      if (response) {
        enableToggle.checked = response.enabled || false;
        oddsTrackingToggle.checked = response.settings?.oddsTracking || false;
        notificationsToggle.checked = response.settings?.notifications || false;

        updateStatusIndicator(response.enabled);
      }
    });
  }

  // Function to update settings
  function updateSettings() {
    const settings = {
      enabled: enableToggle.checked,
      settings: {
        oddsTracking: oddsTrackingToggle.checked,
        notifications: notificationsToggle.checked
      }
    };

    chrome.runtime.sendMessage({
      action: 'updateSettings',
      ...settings
    }, (response) => {
      if (response && response.success) {
        updateStatusIndicator(settings.enabled);
        console.log('Tennis settings updated successfully');
      }
    });
  }

  // Function to update status indicator
  function updateStatusIndicator(enabled) {
    statusIndicator.className = `status-indicator ${enabled ? 'active' : 'inactive'}`;
    statusIndicator.title = enabled ? 'Tennis Extension Active' : 'Tennis Extension Inactive';
  }

  // Function to load page information
  function loadPageInfo() {
    pageInfo.innerHTML = '<p>Loading...</p>';

    chrome.runtime.sendMessage({ action: 'getPageData' }, (response) => {
      if (response) {
        const isTennisPage = response.isTennisLive;
        const liveMatches = response.liveMatches || 0;

        pageInfo.innerHTML = `
          <div class="info-item">
            <strong>URL:</strong> ${response.url || 'N/A'}
          </div>
          <div class="info-item">
            <strong>Title:</strong> ${response.title || 'N/A'}
          </div>
          <div class="info-item">
            <strong>Page Type:</strong> ${isTennisPage ? '🎾 Tennis Live' : 'Other Superbet Page'}
          </div>
          <div class="info-item">
            <strong>Live Matches:</strong> ${liveMatches} matches found
          </div>
          <div class="info-item">
            <strong>Timestamp:</strong> ${response.timestamp ? new Date(response.timestamp).toLocaleString() : 'N/A'}
          </div>
        `;

        // Update button states based on page type
        if (isTennisPage) {
          refreshBtn.disabled = false;
          openPanelBtn.disabled = false;
          clickGameBtn.disabled = false;
          clickOddBtn.disabled = false;
          clickPrimaryBtn.disabled = false;
          clickModalFooterBtn.disabled = false;
          navigateOpenBetsBtn.disabled = false;
          clickBetListBtn.disabled = false;
          clickGreenBtn.disabled = false;
        } else {
          refreshBtn.disabled = true;
          openPanelBtn.disabled = true;
          clickGameBtn.disabled = true;
          clickOddBtn.disabled = true;
          clickPrimaryBtn.disabled = true;
          clickModalFooterBtn.disabled = true;
          navigateOpenBetsBtn.disabled = true;
          clickBetListBtn.disabled = true;
          clickGreenBtn.disabled = true;
        }
      } else {
        pageInfo.innerHTML = '<p>No data available</p>';
      }
    });
  }

  // Function to refresh matches
  function refreshMatches() {
    console.log('Refreshing tennis matches...');

    chrome.runtime.sendMessage({ action: 'refreshMatches' }, (response) => {
      if (response && response.success) {
        console.log('Matches refreshed successfully');
        // Removed automatic page info reload to prevent unnecessary reloading
      }
    });
  }

  // Function to open tennis panel
  function openTennisPanel() {
    console.log('Opening tennis panel...');

    chrome.runtime.sendMessage({ action: 'openTennisPanel' }, (response) => {
      if (response && response.success) {
        console.log('Tennis panel opened successfully');
      } else {
        console.error('Failed to open tennis panel');
      }
    });
  }

  // Function to click Game button
  function clickGame() {
    console.log('Clicking Game button...');

    chrome.runtime.sendMessage({ action: 'clickGame' }, (response) => {
      if (response && response.success) {
        console.log('Game button clicked successfully');
      } else {
        console.error('Failed to click Game button');
      }
    });
  }

  // Function to click Odd button
  function clickOdd() {
    console.log('Clicking Odd button...');

    chrome.runtime.sendMessage({ action: 'clickOdd' }, (response) => {
      if (response && response.success) {
        console.log('Odd button clicked successfully');
      } else {
        console.error('Failed to click Odd button');
      }
    });
  }

  // Function to click Primary button
  function clickPrimary() {
    console.log('Clicking Primary button...');

    chrome.runtime.sendMessage({ action: 'clickPrimary' }, (response) => {
      if (response && response.success) {
        console.log('Primary button clicked successfully');
      } else {
        console.error('Failed to click Primary button');
      }
    });
  }

  // Function to click Modal Footer button
  function clickModalFooter() {
    console.log('Clicking Modal Footer button...');

    chrome.runtime.sendMessage({ action: 'clickModalFooter' }, (response) => {
      if (response && response.success) {
        console.log('Modal Footer button clicked successfully');
      } else {
        console.error('Failed to click Modal Footer button');
      }
    });
  }

  // Function to navigate to Open Bets page
  function navigateOpenBets() {
    console.log('Navigating to Open Bets page...');

    chrome.runtime.sendMessage({ action: 'navigateOpenBets' }, (response) => {
      if (response && response.success) {
        console.log('Navigation to Open Bets page initiated successfully');
      } else {
        console.error('Failed to navigate to Open Bets page');
      }
    });
  }

  // Function to click Bet List button
  function clickBetList() {
    console.log('Clicking Bet List button...');

    chrome.runtime.sendMessage({ action: 'clickBetList' }, (response) => {
      if (response && response.success) {
        console.log('Bet List button clicked successfully');
      } else {
        console.error('Failed to click Bet List button');
      }
    });
  }

  // Function to click Green button
  function clickGreen() {
    console.log('Clicking Green button...');

    chrome.runtime.sendMessage({ action: 'clickGreen' }, (response) => {
      if (response && response.success) {
        console.log('Green button clicked successfully');
      } else {
        console.error('Failed to click Green button');
      }
    });
  }

  // Function to open settings (placeholder)
  function openSettings() {
    console.log('Settings button clicked');
    // You can implement settings page functionality here
    alert('Tennis Extension Settings coming soon!');
  }
}); 