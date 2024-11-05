const hamMenu = document.querySelector('.header__hamburger_menu');
const navActive = document.querySelector('header nav');
const hamBun = document.querySelector('.header__ham_bun');

hamBun.addEventListener('click', () => {

    if(hamMenu.getAttribute('class') === 'header__hamburger_menu')
    {
        hamMenu.setAttribute('class', 'header__hamburger_menu active');
    }
    else
    {
        hamMenu.setAttribute('class', 'header__hamburger_menu');
    }
});