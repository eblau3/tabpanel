const tabpanel = (elements) => {
  const buttons = elements;
  const panels = document.querySelectorAll('.js-tabpanel-panel');
  
  const activeFunc = (button, panel) => {
    buttons.forEach(element => element.classList.remove('is-active'));
    panels.forEach(element => element.classList.remove('is-active'));
    setTimeout(() => {
      button.classList.add('is-active');
      panel.classList.add('is-active');
    });
  };
  
  const initialize = () => {
    const targetTabName = buttons[0].dataset.target;
    const targetButton = document.querySelector(`.js-tabpanel-tab[data-target="${targetTabName}"]`);
    const targetPanel = document.querySelector(`.js-tabpanel-panel[data-name="${targetTabName}"]`);
    buttons.forEach(element => element.classList.remove('is-active'));
    panels.forEach(element => element.classList.remove('is-active'));
    setTimeout(() => {
      targetButton.classList.add('is-active');
      targetPanel.classList.add('is-active');
    });
  };
  
  let url = new URL(window.location.href);
  let params = url.searchParams;
  
  if(params.get('tab')) {
    const targetTabName = params.get('tab');
    const targetButton = document.querySelector(`.js-tabpanel-tab[data-target="${targetTabName}"]`);
    const targetPanel = document.querySelector(`.js-tabpanel-panel[data-name="${targetTabName}"]`);
    if(targetButton && targetPanel) {
      activeFunc(targetButton, targetPanel);
    } else {
      initialize();
    }
  } else {
    initialize();
  }
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTabName = button.dataset.target;
      const targetButton = document.querySelector(`.js-tabpanel-tab[data-target="${targetTabName}"]`);
      const targetPanel = document.querySelector(`.js-tabpanel-panel[data-name="${targetTabName}"]`);
      if(targetButton && targetPanel) activeFunc(targetButton, targetPanel);
    });
  });
};

window.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.js-tabpanel-tab');
  if(targets) tabpanel(targets);
});