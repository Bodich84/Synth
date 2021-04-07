/* open context menu */

function switchContextMenu(event) {
  const btn = event.currentTarget
  const menu = btn.parentNode.querySelector('.context-menu')
  btn.classList.toggle('open-context-menu')
  menu.classList.toggle('context-menu--active')
}

[...document.querySelectorAll('.open-menu')].forEach(item => {
  item.addEventListener("click", switchContextMenu)
});

/* menu */

function switchMenu(event) {
  [...document.querySelectorAll('.menu__link')].forEach(item => {
    item.classList.remove('menu__link--active')
  })
  event.currentTarget.classList.add('menu__link--active')
  console.log('ok')
}

[...document.querySelectorAll('.menu__link')].forEach(item => {
  item.addEventListener("click", switchMenu)
});

