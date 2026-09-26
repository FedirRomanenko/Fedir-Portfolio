(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const frame = document.querySelector("#pcb-model-frame");
    const preview = frame?.querySelector(".pcb-static-preview");
    if (!frame) return;
    let rotationX = 0;
    let rotationY = 0;
    let zoom = 1;
    let dragStart = null;

    function draw() {
      preview.style.transform = `perspective(1200px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${zoom})`;
    }

    function reset() {
      rotationX = 0;
      rotationY = 0;
      zoom = 1;
      frame.classList.remove("is-dragging");
      draw();
    }

    document.querySelector('[data-viewer-action="open"]')?.addEventListener("click", () => {
      frame.classList.add("is-interactive");
      draw();
    });
    document.querySelector('[data-viewer-action="reset"]')?.addEventListener("click", reset);

    preview?.addEventListener("pointerdown", event => {
      if (!frame.classList.contains("is-interactive")) return;
      dragStart = { x: event.clientX, y: event.clientY, rotationX, rotationY };
      frame.classList.add("is-dragging");
      preview.setPointerCapture(event.pointerId);
    });
    preview?.addEventListener("pointermove", event => {
      if (!dragStart) return;
      rotationY = Math.max(-32, Math.min(32, dragStart.rotationY + (event.clientX - dragStart.x) * 0.13));
      rotationX = Math.max(-32, Math.min(32, dragStart.rotationX - (event.clientY - dragStart.y) * 0.13));
      draw();
    });
    const stopDrag = () => {
      dragStart = null;
      frame.classList.remove("is-dragging");
    };
    preview?.addEventListener("pointerup", stopDrag);
    preview?.addEventListener("pointercancel", stopDrag);
    preview?.addEventListener("wheel", event => {
      if (!frame.classList.contains("is-interactive")) return;
      event.preventDefault();
      zoom = Math.max(0.78, Math.min(1.45, zoom - event.deltaY * 0.001));
      draw();
    }, { passive: false });
  });
})();
