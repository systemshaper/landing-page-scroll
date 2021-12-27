/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

// Global variables
const sectionsList = Array.from(document.querySelectorAll('section'));
const nav = document.querySelector('.navbar__menu');

// build the nav menu
const createNavItems = (sections) => {
    const navList = document.querySelector('#navbar__list');
    const navItems = [];

    sections.map(section => {
        const navItem = document.createElement('li');
        const sectionName = section.getAttribute('data-nav');
        const sectionId = section.getAttribute('id');

        navItem.innerHTML = sectionName;
        navItem.classList.add('menu__link');
        navItem.setAttribute('navtarget', sectionId);
        navItems.push(navItem);
    }) 

    navList.append(...navItems);
}

// Add active class to whichever section is most visible currently
const checkActiveSection = (entries) => {
    if (entries[0].isIntersecting) {
        entries[0].target.classList.add('your-active-class');
    } else {
        entries[0].target.classList.remove('your-active-class');
    }
}
const intersectionOptions = { threshold: [0.7] };
const observer = new IntersectionObserver(checkActiveSection, intersectionOptions);

// Scroll to section
const handleNavClick = (e) => {
    // there isn't a default that I'm aware of, but adding this per project requirements
    e.preventDefault();
    const navTarget = e.target.getAttribute('navtarget');
    const destination = document.querySelector(`#${navTarget}`);
    destination.scrollIntoView({behavior: 'smooth'});
}

// Implement nav menu
document.addEventListener('DOMContentLoaded', createNavItems(sectionsList));
nav.addEventListener('click', handleNavClick);

// Set observer to catch changes to active section
document.addEventListener('DOMContentLoaded', sectionsList.forEach(section => {
    observer.observe(section);
}));


