let timer = null;
let timeLeft = 25 * 60;
let running = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "set") {
    const hours = parseInt(message.hours) || 0;
    const minutes = parseInt(message.minutes) || 0;
    const seconds = parseInt(message.seconds) || 0;
    timeLeft = hours * 3600 + minutes * 60 + seconds;
    if (timeLeft < 1) timeLeft = 1;
    chrome.storage.local.set({ timeLeft });
    running = false;
    clearInterval(timer);
    sendResponse({ ok: true });
    return;
  }

  if (message.action === "start" && !running) {
    running = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        chrome.storage.local.set({ timeLeft });
      } else {
        clearInterval(timer);
        running = false;
        chrome.notifications.create({
          type: "basic",
          iconUrl: chrome.runtime.getURL("icons/icon128.png"),
          title: "⏳ Tempo Esgotado!",
          message: "Seu timer terminou!"
        });
      }
    }, 1000);
    sendResponse({ ok: true });
    return;
  }

  if (message.action === "pause") {
    running = false;
    clearInterval(timer);
    sendResponse({ ok: true });
    return;
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ timeLeft: 25 * 60, lastTimerSet: { hours: 0, minutes: 25, seconds: 0 } });
});
