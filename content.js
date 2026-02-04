// Report activity to the background service worker
function reportActivity() {
  chrome.runtime.sendMessage({ action: "recordActivity" }, (response) => {
    if (chrome.runtime.lastError) {
      console.log("Service worker not ready yet");
    } else {
      console.log("Activity reported to service worker");
    }
  });
}

// Track real user activity
["keydown", "click"].forEach(event =>
  document.addEventListener(event, reportActivity, { passive: true, capture: true })
);
