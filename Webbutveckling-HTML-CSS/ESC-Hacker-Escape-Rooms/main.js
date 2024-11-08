const body = document.querySelector('body');
const container = document.querySelector('.container');
const hamClick = document.querySelector('.hamburger_click');
const hamDrop = document.querySelector('.hamburger_menu');
const mobileNav = document.querySelector('.mobile_nav');

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

hamClick.addEventListener('click', () => {
    if (body.getAttribute('class') === 'active' &&
        container.getAttribute('class') === 'container active' &&
        hamDrop.getAttribute('class') === 'hamburger_menu active' && 
        mobileNav.getAttribute('class') === 'mobile_nav active')
    {
        body.setAttribute('class', '');
        container.setAttribute('class', 'container');
        hamDrop.setAttribute('class', 'hamburger_menu');
        mobileNav.setAttribute('class', 'mobile_nav');
    }
    else {
        body.setAttribute('class', 'active');
        container.setAttribute('class', 'container active');
        hamDrop.setAttribute('class', 'hamburger_menu active');
        mobileNav.setAttribute('class', 'mobile_nav active');
        topFunction();
    }
});