const openMenuBtn = document.querySelector(`.page-header__open-btn`);
const menu = document.querySelector(`.page-header__nav`);
const closeMenuBtn = menu.querySelector(`.page-header__close-btn`);
const openAboutMenuBtn = document.querySelector(`.page-header__open-btn--about`);
const aboutMenu = document.querySelector(`.page-header__about-menu-wrapper`);
const closeAboutMenuBtn = menu.querySelector(`.page-header__close-btn--about`);



const onCloseMenuBtnClick = function (evt) {
  evt.preventDefault();
  if (!menu.classList.contains(`hide`)) {
    menu.classList.add(`hide`);
    aboutMenu.classList.add(`hide`);
    openMenuBtn.classList.remove('hide')
  }

  closeMenuBtn.removeEventListener(`click`, onCloseMenuBtnClick);
}

const onOpenMenuBtnClick = function (evt) {
  evt.preventDefault();

  if (menu.classList.contains(`hide`)) {
    menu.classList.remove(`hide`);
    aboutMenu.classList.remove(`hide`);
    openMenuBtn.classList.add('hide');
  }

  closeMenuBtn.addEventListener(`click`, onCloseMenuBtnClick);
};

const onCloseAboutMenuBtnClick = function (evt) {
  evt.preventDefault();
  if (!aboutMenu.classList.contains(`hide`)) {
    aboutMenu.classList.add(`hide`);
    aboutMenu.classList.add(`hide`);
    openAboutMenuBtn.classList.remove('hide')
  }

  closeAboutMenuBtn.removeEventListener(`click`, onCloseMenuBtnClick);
};

const onOpenAboutMenuBtnClick = function (evt) {
  evt.preventDefault();

  if (aboutMenu.classList.contains(`hide`)) {
    aboutMenu.classList.remove(`hide`);
    openAboutMenuBtn.classList.add('hide');
  }

  closeAboutMenuBtn.addEventListener(`click`, onCloseAboutMenuBtnClick);
}

openMenuBtn.addEventListener(`click`, onOpenMenuBtnClick);
openAboutMenuBtn.addEventListener(`click`, onOpenAboutMenuBtnClick);
window.addEventListener(`resize`, onCloseMenuBtnClick);
