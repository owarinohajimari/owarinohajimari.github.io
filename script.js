(() => {
  const groups = window.OWAHAJI_LINKS || {};

  const render = (id, items = []) => {
    const el = document.getElementById(id);
    if (!el) return;

    items.filter(item => item.url && item.url.trim()).forEach(item => {
      const a = document.createElement("a");
      a.className = "link-row";
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      const name = document.createElement("span");
      name.className = "link-name";
      name.textContent = item.name;

      const meta = document.createElement("span");
      meta.className = "link-meta";
      meta.textContent = `${item.meta} ↗`;

      a.append(name, meta);
      el.appendChild(a);
    });
  };

  render("official-links", groups.official);
  render("takase-links", groups.takase);
  render("nehan-links", groups.nehan);
  render("sui-links", groups.sui);
  render("mii-links", groups.mii);
  render("luu-links", groups.luu);
  render("kuhara-links", groups.kuhara);
  render("poyo-links", groups.poyo);
})();
