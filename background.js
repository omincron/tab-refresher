const INACTIVITY_LIMIT = 25 * 60 * 1000; // 25 minutes (before 30min timeout)
const CHECK_INTERVAL = 60 * 1000; // Check every minute
let lastActivity = Date.now();

// Listen for activity messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "recordActivity") {
    lastActivity = Date.now();
    console.log("User activity detected in tab:", sender.tab.id);
    sendResponse({ status: "activity recorded" });
  }
});

// Periodically check for inactivity and refresh if needed
setInterval(() => {
  const inactiveFor = Date.now() - lastActivity;

  if (inactiveFor > INACTIVITY_LIMIT) {
    console.log(`Inactive for ${Math.round(inactiveFor / 60000)} minutes. Refreshing tabs to maintain session...`);
    
    // Find and refresh all tabs matching the target URL
    chrome.tabs.query({ url: "https://pylon176.pylonflex.gr/*" }, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.reload(tab.id);
        console.log(`Refreshed tab ${tab.id}`);
      });
    });
    
    lastActivity = Date.now(); // Reset after reload
  } else {
    console.log(`Active session - last activity ${Math.round(inactiveFor / 60000)} minutes ago`);
  }
}, CHECK_INTERVAL);
