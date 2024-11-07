const body = document.querySelector('body');
const container = document.querySelector('.container');
const hamDrop = document.querySelector('.hamburger_menu');
const hamClick = document.querySelector('.hamburger_click');
const mobileNav = document.querySelector('.mobile_nav');

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  } 

hamClick.addEventListener('click', () => {

    if(hamDrop.getAttribute('class') === 'hamburger_menu' && 
        mobileNav.getAttribute('class') === 'mobile_nav' && 
        body.getAttribute('class') === '' &&
        container.getAttribute('class') === 'container')
    {
        body.setAttribute('class', 'active');
        hamDrop.setAttribute('class', 'hamburger_menu active');
        mobileNav.setAttribute('class', 'mobile_nav active');
        container.setAttribute('class', 'container active');
        topFunction();
    }
    else
    {
        body.setAttribute('class', '');
        hamDrop.setAttribute('class', 'hamburger_menu');
        mobileNav.setAttribute('class', 'mobile_nav');
        container.setAttribute('class', 'container');
    }
});