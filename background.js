const INACTIVITY_LIMIT = 25 * 60 * 1000; // 25 minutes (before 30min timeout)
const CHECK_INTERVAL = 60 * 1000; // Check every minute
let tabActivity = {}; // Track activity per tab ID

// Listen for activity messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "recordActivity") {
    tabActivity[sender.tab.id] = Date.now();
    console.log("User activity detected in tab:", sender.tab.id);
    sendResponse({ status: "activity recorded" });
  }
});

// Periodically check for inactivity and refresh if needed
setInterval(() => {
  chrome.tabs.query({ url: "https://pylon176.pylonflex.gr/*" }, (tabs) => {
    const now = Date.now();
    
    tabs.forEach(tab => {
      // Initialize tab activity if not tracked yet
      if (!tabActivity[tab.id]) {
        tabActivity[tab.id] = now;
      }
      
      const inactiveFor = now - tabActivity[tab.id];
      
      if (inactiveFor > INACTIVITY_LIMIT) {
        console.log(`Tab ${tab.id} inactive for ${Math.round(inactiveFor / 60000)} minutes. Refreshing...`);
        chrome.tabs.reload(tab.id);
        tabActivity[tab.id] = now; // Reset after reload
      } else {
        console.log(`Tab ${tab.id} - last activity ${Math.round(inactiveFor / 60000)} minutes ago`);
      }
    });
  });
}, CHECK_INTERVAL);
