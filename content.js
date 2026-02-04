const INACTIVITY_LIMIT = 25 * 60 * 1000; // 25 minutes (before 30min timeout)
const CHECK_INTERVAL = 60 * 1000; // Check every minute
let lastActivity = Date.now();

function recordActivity() {
  lastActivity = Date.now();
  console.log("User activity detected");
}

// Track real user activity
["keydown", "click", "touchstart"].forEach(event =>
  document.addEventListener(event, recordActivity, { passive: true, capture: true })
);

// Periodically check for inactivity and refresh if needed
setInterval(() => {
  const inactiveFor = Date.now() - lastActivity;

  if (inactiveFor > INACTIVITY_LIMIT) {
    console.log(`Inactive for ${Math.round(inactiveFor / 60000)} minutes. Refreshing page to maintain session...`);
    
    // Actually reload the page to send a request to the server
    location.reload();
    
    lastActivity = Date.now(); // Reset after reload
  } else {
    console.log(`Active session - last activity ${Math.round(inactiveFor / 60000)} minutes ago`);
  }
}, CHECK_INTERVAL);
