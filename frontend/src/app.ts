  (function() {
    document.addEventListener('DOMContentLoaded', () => {
      const footer = document.querySelector('footer');
      if (!footer || !performance.timing) return;

      let loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;

      if (loadTime < 0) {
        loadTime = 0;
      }

      const loadTimeSec = (loadTime / 1000).toFixed(10);

      const infoDiv = document.createElement('div');
      infoDiv.textContent = `Страница загружена за ${loadTimeSec} сек`;
      footer.appendChild(infoDiv);
    });
  })();
