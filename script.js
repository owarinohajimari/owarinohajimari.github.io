(() => {
  const groups = window.OWAHAJI_LINKS || {};

  const renderGroup = (targetId, items = []) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const activeItems = items.filter(item => item.url && item.url.trim());

    activeItems.forEach(item => {
      const a = document.createElement("a");
      a.className = "link-row reveal";
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", `${item.name}を開く`);

      const name = document.createElement("span");
      name.className = "link-name";
      name.textContent = item.name;

      const meta = document.createElement("span");
      meta.className = "link-meta";
      meta.textContent = `${item.meta} ↗`;

      a.append(name, meta);
      target.appendChild(a);
    });
  };

  renderGroup("official-links", groups.official);
  renderGroup("takase-links", groups.takase);
  renderGroup("nehan-links", groups.nehan);
  renderGroup("awai-links", groups.awai);

  const revealEls = [...document.querySelectorAll(".reveal")];

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("is-visible"));
  }
})();
