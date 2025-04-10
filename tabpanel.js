const tabpanel = (el) => {
  /**
   * タブとパネルの更新
   * @param {string} id アクティブにするタブとパネルの ID (aria-controls と panel id)
   */
  const activateTabpanel = (id) => {
    if (activeTabEl && activePanelEl) {
      activeTabEl.classList.remove(TAB_ACTIVE_CLASS);
      activeTabEl.setAttribute('aria-selected', 'false');
      activePanelEl.classList.remove(PANEL_VISIBLE_CLASS);
      activePanelEl.setAttribute('aria-hidden', 'true');
    }

    const targetTabEl = Array.from(tabEls).find(tabEl => tabEl.getAttribute('aria-controls') === id);
    const targetPanelEl = Array.from(panelEls).find(panelEl => panelEl.id === id);

    if (targetTabEl && targetPanelEl) {
      targetTabEl.classList.add(TAB_ACTIVE_CLASS);
      targetTabEl.setAttribute('aria-selected', 'true');
      targetPanelEl.classList.add(PANEL_VISIBLE_CLASS);
      targetPanelEl.setAttribute('aria-hidden', 'false');

      activeTabEl = targetTabEl;
      activePanelEl = targetPanelEl;
    }
  };

  /**
   * タブとパネルの初期化
   */
  const initialize = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const panelId = urlParams.get('tab');

    if (panelId) {
      activateTabpanel(panelId);
    } else {
      const firstTabEl = tabEls[0];
      if (firstTabEl) {
        const panelId = firstTabEl.getAttribute('aria-controls');
        if (panelId) activateTabpanel(panelId);
      }
    }
  };

  const tabEls = el.querySelectorAll('.js-tabpanel-tab');
  const panelEls = el.querySelectorAll('.js-tabpanel-panel');

  const TAB_ACTIVE_CLASS = 'is-active';
  const PANEL_VISIBLE_CLASS = 'is-visible';

  let activeTabEl = null;
  let activePanelEl = null;

  initialize();

  tabEls.forEach(tabEl => {
    tabEl.addEventListener('click', () => {
      const panelId = tabEl.getAttribute('aria-controls');
      if (panelId) activateTabpanel(panelId);
    });
  });
};

window.addEventListener('DOMContentLoaded', () => {
  const tabpanelEls = document.querySelectorAll('.js-tabpanel');
  if (tabpanelEls.length > 0) tabpanelEls.forEach(tabpanelEl => tabpanel(tabpanelEl));
});