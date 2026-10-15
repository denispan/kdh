// Появление элементов с data-reveal при попадании во вьюпорт.
// Стили — в global.css (.js [data-reveal]); каскадная задержка — через --reveal-delay.
export const initReveal = () => {
  const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (items.length === 0) {
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    for (const item of items) {
      item.classList.add("is-visible");
    }
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );

  for (const item of items) {
    observer.observe(item);
  }
};
