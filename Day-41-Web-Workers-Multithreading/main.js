let myWorker = null;

const startBtn = document.getElementById("startBtn");
const cancelBtn = document.getElementById("cancelBtn");
const statusText = document.getElementById("status");
const statusBadge = document.getElementById("statusBadge");
const result = document.getElementById("result");

function createWorker() {
  myWorker = new Worker("worker.js");

  myWorker.onmessage = function (event) {
    const { message, result: calculationResult, duration } = event.data;

    statusText.textContent = message;

    statusBadge.textContent = "COMPLETE";
    statusBadge.className = "badge complete";

    result.innerHTML = `
      <strong>Calculation completed successfully.</strong><br>
      Result: ${calculationResult.toLocaleString()}<br>
      Completed in ${duration} ms.
    `;

    startBtn.disabled = false;
    cancelBtn.disabled = true;

    myWorker.terminate();
    myWorker = null;
  };
}

startBtn.addEventListener("click", () => {
  createWorker();

  statusText.textContent = "Heavy process running in background...";

  statusBadge.textContent = "PROCESSING";
  statusBadge.className = "badge processing";

  result.textContent =
    "The calculation is happening inside a Web Worker. Notice that the animation is still running smoothly ✨";

  startBtn.disabled = true;
  cancelBtn.disabled = false;

  myWorker.postMessage("START");
});

cancelBtn.addEventListener("click", () => {
  if (myWorker) {
    myWorker.terminate();
    myWorker = null;
  }

  statusText.textContent = "Process cancelled";

  statusBadge.textContent = "CANCELLED";
  statusBadge.className = "badge cancelled";

  result.textContent =
    "The Web Worker was terminated before the calculation finished.";

  startBtn.disabled = false;
  cancelBtn.disabled = true;
});