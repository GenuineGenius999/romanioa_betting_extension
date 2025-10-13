# Superbet Tennis Live Extension

A Chrome extension designed to enhance the Superbet.ro tennis live betting experience with advanced automation and filtering features.

## 🎾 Features

### **Core Functionality**
- **🎾 Tennis Live Detection**: Automatically detects when you're on the tennis live betting page
- **Live Match Monitoring**: Tracks and displays live tennis matches in real-time
- **Odds Tracking**: Monitor odds changes for tennis matches with historical data
- **Match Notifications**: Get notified about new matches and important events
- **Tennis Panel**: Floating panel with live match information and controls

### **Automatic Event Processing**
- **Smart Event Selection**: Automatically clicks on the first tennis event in each section
- **Event Navigation**: Navigates through event-grid__events-container → event-row-container → event-card → event-card__main-content → event
- **Game Button Clicking**: Automatically finds and clicks the "Game" button with class "sds-filter-bar-item--brand"
- **Odd Button Clicking**: Automatically clicks on the first div with class "odd-button__inner"
- **Real-time Processing**: Processes new events as they appear on the page
- **Automatic Execution**: Runs automatically when the page loads and when new content appears

### **Advanced Features**
- **Smart Event Processing**: Automatically clicks on tennis events (excluding CHALLENGER)
- **Real-time Updates**: Live monitoring of page changes and new matches
- **Settings Management**: Toggle extension features on/off with persistent storage
- **Modern UI**: Clean, responsive design with tennis-themed styling
- **Error Handling**: Robust error handling and debugging capabilities

## 🚀 Installation

### **Step 1: Download/Clone**
```bash
git clone <repository-url>
cd Betting_Extenssion
```

### **Step 2: Load Extension in Chrome**
1. **Open Chrome** and navigate to `chrome://extensions/`
2. **Enable Developer Mode** by toggling the switch in the top-right corner
3. **Click "Load unpacked"** and select the folder containing this extension
4. **Pin the extension** to your toolbar for easy access

### **Step 3: Verify Installation**
- The extension icon should appear in your Chrome toolbar
- Click the icon to open the popup and verify it's working
- Check the browser console for extension loading messages

## 📖 Usage

### **On Superbet Tennis Live Page**
1. Visit https://superbet.ro/pariuri-sportive/tenis/live
2. The extension will automatically activate
3. A floating "🎾 Tennis Live" button will appear in the top-right corner
4. Click the button to open the tennis panel with live match information

### **Extension Popup Features**
- **Enable/Disable**: Toggle the extension on/off
- **Auto Refresh**: Automatically refresh matches
- **Odds Tracking**: Track odds changes for matches
- **Notifications**: Enable match notifications
- **Page Information**: View current page details and live match count
- **Quick Actions**: Refresh matches, open tennis panel, click Game button, click Odd button

### **Tennis Panel Features**
- **Live Match Counter**: Shows number of active tennis matches
- **Match List**: Displays all live tennis matches with scores
- **Track Matches**: Individual tracking buttons for each match
- **Odds Tracking**: Monitor odds changes for selected matches
- **Process Events**: Automatically process tennis events
- **Click Game**: Manually click the "Game" button
- **Click Odd**: Manually click the first odd button

## 🧪 Testing

### **Test Page**
Open `test.html` in your browser to test all extension features:
- Extension status verification
- Tennis match detection
- Game button clicking
- Odd button clicking
- Panel functionality
- Notifications
- Odds tracking simulation

### **Real Environment Testing**
1. Install the extension
2. Open the test page: `test.html`
3. Click "Open Superbet Tennis Live" to test in real environment
4. Verify all features work correctly

## 🔧 Development

### **File Structure**
```
Betting_Extenssion/
├── manifest.json          # Extension configuration
├── content.js            # Tennis-specific page functionality
├── background.js         # Background service worker
├── popup.html           # Extension popup interface
├── popup.js             # Popup functionality
├── styles.css           # Styling for popup and content
├── test.html            # Testing page
├── icons/               # Extension icons (16x16, 48x48, 128x128)
└── README.md           # This file
```

### **Adding Icons**
Place your extension icons in the `icons/` directory:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)  
- `icon128.png` (128x128 pixels)

### **Customizing Features**
- **Tennis Detection**: Modify `content.js` for different match detection logic
- **UI Styling**: Edit `styles.css` to customize appearance
- **Popup Features**: Update `popup.js` for new popup functionality
- **Background Tasks**: Add functionality in `background.js`

### **Testing Changes**
1. Make changes to your code
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Test the changes on the tennis live page or test.html

## 🔒 Permissions

This extension requires:
- `activeTab`: To interact with the current tab
- `storage`: To save user settings and preferences
- `notifications`: To send tennis match notifications
- `https://superbet.ro/*`: To run on Superbet.ro pages

## 🎯 Tennis-Specific Features

### **Live Match Detection**
- Automatically detects tennis matches on the page
- Updates match count in real-time
- Monitors for new matches being added
- Multiple selector strategies for robust detection

### **Automatic Event Processing**
- **Smart Navigation**: Automatically navigates to the correct event elements
- **First Event Selection**: Clicks on the first event in each container
- **Real-time Updates**: Processes events as they appear on the page
- **Error Handling**: Robust error handling for missing elements

### **Odds Tracking**
- Track odds changes for specific matches
- Historical odds data collection
- Odds movement alerts
- Configurable tracking intervals

### **Event Processing**
- Smart event selection and clicking
- Automatic navigation through DOM structure
- Error handling and retry logic
- Performance optimization

## 🐛 Troubleshooting

### **Extension Not Loading**
1. Check Chrome console for errors
2. Verify manifest.json is valid
3. Ensure all files are present
4. Try reloading the extension

### **Features Not Working**
1. Check if you're on the correct Superbet page
2. Verify extension permissions
3. Check browser console for errors
4. Test with the test.html page

### **Tennis Panel Not Appearing**
1. Ensure you're on the tennis live page
2. Check if the button is visible
3. Verify CSS is loading correctly
4. Check for JavaScript errors

### **Events Not Being Processed**
1. Verify you're on the tennis live page
2. Check if event containers exist on the page
3. Try refreshing the page
4. Check browser console for error messages

## 🔮 Future Enhancements

- **Advanced Tennis Statistics**: Player performance tracking
- **Betting Strategy Recommendations**: AI-powered suggestions
- **Historical Match Data**: Integration with tennis databases
- **Real-time Score Updates**: Live score monitoring
- **Advanced Odds Comparison**: Multi-site odds comparison
- **Tennis Player Analytics**: Performance metrics and trends
- **Custom Filters**: User-defined match filtering
- **Export Features**: Data export for analysis

## 📞 Support

For issues or feature requests:
1. Check the troubleshooting section above
2. Test with the provided test.html page
3. Check browser console for error messages
4. Create an issue in the repository with detailed information

## 📄 License

This project is for educational and personal use only. Please respect the terms of service of Superbet.ro and use responsibly.

## 🔄 Version History

- **v1.0.0**: Initial release with core tennis features
- **v1.1.0**: Added WTA management and improved UI
- **v1.2.0**: Enhanced error handling and testing capabilities
- **v1.3.0**: Added comprehensive testing suite and documentation

---

**🎾 Happy Tennis Betting! 🎾** 