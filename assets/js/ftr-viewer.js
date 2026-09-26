(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const frame = document.querySelector("#pcb-model-frame");
    if (!frame) return;
    const model = frame.querySelector("model-viewer");
    const status = frame.querySelector(".viewer-status");
    const openButton = document.querySelector('[data-viewer-action="open"]');
    let timeoutId;
    let modelLoaded = false;

    function showRealModel() {
      window.clearTimeout(timeoutId);
      frame.classList.remove("is-loading");
      frame.classList.add("is-real-model");
      if (status) {
        status.textContent = "Настоящая 3D‑модель загружена: перетаскивайте её для вращения.";
      }
    }

    function restorePreview() {
      window.clearTimeout(timeoutId);
      frame.classList.remove("is-loading", "is-real-model");
      if (status) status.textContent = "";
    }

    openButton?.addEventListener("click", () => {
      frame.classList.remove("is-real-model");
      frame.classList.add("is-loading");
      if (status) status.textContent = "Загружается настоящая 3D‑модель…";

      if (modelLoaded) {
        showRealModel();
        return;
      }

      timeoutId = window.setTimeout(() => {
        if (!frame.classList.contains("is-real-model")) {
          frame.classList.remove("is-loading");
          if (status) status.textContent = "3D‑модель не запустилась в этом браузере — оставлен обычный вид платы.";
        }
      }, 12000);

      if (!model.getAttribute("src")) model.setAttribute("src", model.dataset.src);
    });

    model?.addEventListener("load", () => {
      modelLoaded = true;
      if (frame.classList.contains("is-loading")) showRealModel();
    });

    model?.addEventListener("error", () => {
      restorePreview();
      if (status) status.textContent = "3D‑модель не удалось загрузить — оставлен обычный вид платы.";
    });

    document.querySelector('[data-viewer-action="reset"]')?.addEventListener("click", restorePreview);
  });
})();
