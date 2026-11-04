(() => {
  'use strict';
  // Data is loaded from the original links.js, preserving every existing URL.
  const groups = window.OWAHAJI_LINKS || {};

  // Preserve the link-directory order from the previous published version.
  const producer = [
    { key: 'takase', title: 'TAKASE KEI', subtitle: 'Producer / 高世 圭', art: 5 }
  ];

  const liver = [
    { key: 'nehan', title: 'NEHAN', subtitle: 'Liver / 涅槃', art: 4 },
    { key: 'sui', title: 'SUI', subtitle: 'Liver / 翠', art: 3 },
    { key: 'mii', title: 'HIRUKAZE MII', subtitle: 'Liver / Illustrator / 昼風みぃ', art: 2 },
    { key: 'luu', title: 'YORUKAZE LUU', subtitle: 'Liver / 夜風るぅ', art: 0 },
    { key: 'necology', title: 'NECOLOGY', subtitle: 'Liver / 猫路地', art: 1 }
  ];

  const staff = [
    { key: 'kuhara', title: 'KUHARA HAKU', subtitle: 'Illustrator / くはらはく', art: 9 },
    { key: 'poyo', title: 'POYOKICHI', subtitle: 'Designer / ﾎﾟﾖ吉', art: 6 },
    // Existing unlinked staff cards come after all original linked entries.
    { key: null, title: 'GOUSHI', subtitle: 'Music / 剛士', art: 6 },
    { key: null, title: 'DAIKI', subtitle: 'Mix & Mastering / DAIKI', art: 7 },
    { key: null, title: 'HANA', subtitle: 'Design & Movie / 花', art: 8 }
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
  const createCard = person => {
    const row = ns('article', 'person-row');
    const art = ns('div', 'person-art');
    art.style.setProperty('--art-pos', `${person.art / 9 * 100}%`);
    art.setAttribute('aria-hidden', 'true');
    const details = ns('div', 'person-details');
    details.append(ns('p', 'person-subtitle', person.subtitle));
    details.append(ns('h3', 'person-name', person.title));
    const social = ns('div', 'person-social');
    const items = (groups[person.key] || []).filter(valid);
    if (items.length) {
      items.forEach(item => social.append(createLink(item)));
    } else {
      const span = ns('span', 'creative-credit', 'CREATIVE TEAM');
      social.append(span);
    }
    row.append(art, details, social);
    return row;
  };
  const renderRoster = (elementId, people) => {
    const root = document.getElementById(elementId);
    if (!root) return;
    const fragment = document.createDocumentFragment();
    people.forEach(person => fragment.append(createCard(person)));
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
      const mark = ns('span', 'official-mark', item.name === 'X' ? '𝕏' : item.name === 'YouTube' ? '▶' : item.name === 'TikTok' ? '♪' : '◈');
      mark.setAttribute('aria-hidden', 'true');
      const label = ns('span', 'official-name', item.name);
      const arrow = ns('span', 'social-arrow', '↗');
      arrow.setAttribute('aria-hidden', 'true');
      a.append(mark, label, arrow);
      fragment.append(a);
    });
    root.replaceChildren(fragment);
  };
  renderRoster('producer-list', producer);
  renderRoster('liver-list', liver);
  renderRoster('staff-list', staff);
  renderOfficial();
})();
