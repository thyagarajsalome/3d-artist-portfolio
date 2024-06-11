// script.js
const nav = document.getElementById('nav');
const navIcon = document.querySelector('#nav .nav-icon');

navIcon.addEventListener('click', () => {
    navIcon.classList.toggle('open');
    navIcon.classList.toggle('close');
});