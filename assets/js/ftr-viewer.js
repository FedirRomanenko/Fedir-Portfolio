(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const frame = document.querySelector("#pcb-model-frame");
    if (!frame) return;
    document.querySelector('[data-viewer-action="open"]')?.addEventListener("click", () => frame.classList.add("is-interactive"));
    document.querySelector('[data-viewer-action="reset"]')?.addEventListener("click", () => frame.classList.remove("is-interactive"));
  });
})();
