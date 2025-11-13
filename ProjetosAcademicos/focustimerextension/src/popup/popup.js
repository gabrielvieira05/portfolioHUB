const timerDisplay = document.getElementById('timer');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

function saveLastTimerSet(hours, minutes, seconds) {
  chrome.storage.local.set({ lastTimerSet: { hours, minutes, seconds } });
}

document.getElementById("setBtn").addEventListener("click", async () => {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  await chrome.runtime.sendMessage({ action: "set", hours, minutes, seconds });
  saveLastTimerSet(hours, minutes, seconds);
});

document.getElementById("startBtn").addEventListener("click", async () => {
  await chrome.runtime.sendMessage({ action: "start" });
});

document.getElementById("pauseBtn").addEventListener("click", async () => {
  await chrome.runtime.sendMessage({ action: "pause" });
});

document.getElementById("resetBtn").addEventListener("click", async () => {
  chrome.storage.local.get(["lastTimerSet"], async (data) => {
    const { hours = 0, minutes = 25, seconds = 0 } = data.lastTimerSet || {};
    await chrome.runtime.sendMessage({ action: "set", hours, minutes, seconds });
  });
});

function formatTimer(timeLeft) {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0")
  ].join(":");
}

function updateDisplay() {
  chrome.storage.local.get(["timeLeft"], (data) => {
    if (data.timeLeft !== undefined) {
      timerDisplay.textContent = formatTimer(data.timeLeft);
    }
  });
}

setInterval(updateDisplay, 1000);
updateDisplay();
