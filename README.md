# Work Session Keeper

A lightweight Chrome extension that prevents automatic logout by refreshing your page after periods of inactivity.

## Problem It Solves

Many web applications automatically log you out after 30 minutes of inactivity. This extension keeps your session alive by automatically refreshing the page when you've been inactive for 25 minutes, preventing those frustrating timeouts and saving you from repeatedly logging in.

## Features

- 🔄 Auto-refreshes page after 25 minutes of inactivity
- 👁️ Monitors real user activity
- 📊 Console logging to track activity status
- ⚡ Lightweight and efficient
- 🎯 Targeted to specific website (easily configurable)

## Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/omincron/tab-refresher.git
   ```

2. Open Chrome and navigate to:
   ```
   chrome://extensions/
   ```

3. Enable **Developer mode** (toggle in the top-right corner)

4. Click **Load unpacked**

5. Select the `tab-refresher` folder

6. The extension is now installed and active! ✅

## How It Works

1. The extension monitors your activity on the configured website
2. Every minute, it checks how long you've been inactive
3. If you've been inactive for 25+ minutes, it automatically refreshes the page
4. This sends a request to the server, keeping your session alive
5. After the refresh, the timer resets

## Configuration

To change the target website, edit [manifest.json](manifest.json):

```json
"matches": ["https://pylon176.pylonflex.gr//*"]
```

Replace with your website URL pattern.

To adjust the inactivity timeout, edit [content.js](content.js):

```javascript
const INACTIVITY_LIMIT = 25 * 60 * 1000; // 25 minutes (in milliseconds)
```

## Monitoring

Open the browser console (F12 → Console) to see activity logs:
- Activity detection messages
- Inactivity status updates every minute
- Refresh notifications

## Compatibility

- Chrome/Chromium-based browsers (Chrome, Edge, Brave, etc.)
- Manifest V3 compliant
- Works on desktop and mobile browsers

## License

MIT License - Feel free to use and modify for your needs.

## Contributing

Issues and pull requests are welcome!
