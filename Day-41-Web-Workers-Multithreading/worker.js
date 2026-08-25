self.onmessage = function (event) {
  if (event.data === "START") {
    const startTime = performance.now();

    let total = 0;

    // Heavy calculation running in a separate thread
    for (let i = 0; i < 100000000; i++) {
      total += i % 10;
    }

    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    self.postMessage({
      message: "Heavy process completed successfully!",
      result: total,
      duration: duration
    });
  }
};