(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const buttons = [...document.querySelectorAll("[data-project-filter]")];
    const cards = [...document.querySelectorAll("[data-project-category]")];
    let activeFilter = null;

    function render() {
      cards.forEach(card => {
        card.hidden = Boolean(activeFilter && card.dataset.projectCategory !== activeFilter);
      });
      buttons.forEach(button => {
        const active = button.dataset.projectFilter === activeFilter;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    }

    buttons.forEach(button => button.addEventListener("click", () => {
      const filter = button.dataset.projectFilter;
      activeFilter = activeFilter === filter ? null : filter;
      render();
    }));
  });
})();
