document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = mobileNav.querySelectorAll('a');

    // Function to open mobile menu
    const openMobileMenu = () => {
        mobileNav.classList.add('active');
    };

    // Function to close mobile menu
    const closeMobileMenu = () => {
        mobileNav.classList.remove('active');
    };

    // Event listeners for menu icons
    menuIcon.addEventListener('click', openMobileMenu);
    closeIcon.addEventListener('click', closeMobileMenu);

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in effect
    const fadeInElements = document.querySelectorAll('section');
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });
});