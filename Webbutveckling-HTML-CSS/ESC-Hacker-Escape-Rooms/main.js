const body = document.querySelector('body');
const hamDrop = document.querySelector('.header__hamburger_menu');
const hamClick = document.querySelector('.header__ham_click');
const navActive = document.querySelector('header nav');

hamClick.addEventListener('click', () => {

    if(hamDrop.getAttribute('class') === 'header__hamburger_menu' && 
        navActive.getAttribute('class') === '' && 
        body.getAttribute('class') === '')
    {
        body.setAttribute('class', 'active');
        hamDrop.setAttribute('class', 'header__hamburger_menu active');
        navActive.setAttribute('class', 'active');
    }
    else
    {
        body.setAttribute('class', '');
        hamDrop.setAttribute('class', 'header__hamburger_menu');
        navActive.setAttribute('class', '');
    }
});