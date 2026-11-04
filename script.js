(() => {
  'use strict';
  // Data is loaded from the original links.js, preserving every existing URL.
  const groups = window.OWAHAJI_LINKS || {};

  // Preserve existing member order and links; no decorative art or ranking numbers.
  const liver = [
    { key: 'nehan', title: 'NEHAN', subtitle: 'Liver / 涅槃' },
    { key: 'sui', title: 'SUI', subtitle: 'Liver / 翠' },
    { key: 'mii', title: 'HIRUKAZE MII', subtitle: 'Liver / Illustrator / 昼風みぃ' },
    { key: 'luu', title: 'YORUKAZE LUU', subtitle: 'Liver / 夜風るぅ' },
    { key: 'necology', title: 'NECOLOGY', subtitle: 'Liver / 猫路地' }
  ];

  const staff = [
    { key: 'takase', title: 'TAKASE KEI', subtitle: 'Music / Design / Movie / 高世 圭' },
    { key: 'kuhara', title: 'KUHARA HAKU', subtitle: 'Illustrator / くはらはく' },
    { key: 'poyo', title: 'POYOKICHI', subtitle: 'Designer / staff ﾎﾟﾖ吉' },
    { key: null, title: 'TSUYOSHI', subtitle: 'Music / つよし' },
    { key: null, title: 'DAIKI', subtitle: 'Music' },
    { key: null, title: 'SEKI', subtitle: 'Desk staff / Design / Movie / セキ' }
  ];

  const ns = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const valid = item => item && typeof item.url === 'string' && /^https:\/\//.test(item.url);
  const createLink = item => {
    const a = ns('a', 'social-link');
    a.href = item.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', `${item.name} を新しいタブで開く`);
    const name = ns('span', 'social-name', item.name === 'X' ? '𝕏' : item.name);
    if (item.name === 'X') name.classList.add('social-name-x');
    const arrow = ns('span', 'social-arrow', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    a.append(name, arrow);
    return a;
  };
  const createCard = (person, kind) => {
    const row = ns('article', `person-row ${kind}-row`);
    const details = ns('div', 'person-details');
    if (person.subtitle) details.append(ns('p', 'person-subtitle', person.subtitle));
    details.append(ns('h3', 'person-name', person.title));
    row.append(details);

    const items = (groups[person.key] || []).filter(valid);
    if (items.length) {
      const social = ns('div', 'person-social');
      items.forEach(item => social.append(createLink(item)));
      row.append(social);
    } else {
      row.classList.add('without-links');
    }
    return row;
  };
  const renderRoster = (elementId, people, kind) => {
    const root = document.getElementById(elementId);
    if (!root) return;
    const fragment = document.createDocumentFragment();
    people.forEach(person => fragment.append(createCard(person, kind)));
    root.replaceChildren(fragment);
  };
  const renderOfficial = () => {
    const root = document.getElementById('official-links');
    if (!root) return;
    const fragment = document.createDocumentFragment();
    (groups.official || []).filter(valid).forEach(item => {
      const a = ns('a', 'official-link');
      a.href = item.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', `${item.name} を新しいタブで開く`);
      const mark = ns('span', 'official-mark', item.name === 'X' ? '𝕏' : item.name === 'YouTube' ? '▶' : item.name === 'TikTok' ? '♪' : '🛒');
      mark.setAttribute('aria-hidden', 'true');
      const label = ns('span', 'official-name', item.name);
      const arrow = ns('span', 'social-arrow', '↗');
      arrow.setAttribute('aria-hidden', 'true');
      a.append(mark, label, arrow);
      fragment.append(a);
    });
    root.replaceChildren(fragment);
  };
  renderRoster('liver-list', liver, 'liver');
  renderRoster('staff-list', staff, 'staff');
  renderOfficial();
})();
