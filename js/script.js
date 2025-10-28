
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const headerHeight = 80;
    const sectionPosition = section.offsetTop - headerHeight;

    window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
    });

    // Close mobile menu if open
    document.getElementById('navLinks').classList.remove('active');
}

function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Smooth scroll on page load
document.addEventListener('DOMContentLoaded', function () {
    // Add scroll effect to header
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.padding = '1rem 5%';
        } else {
            header.style.padding = '1.5rem 5%';
        }

        lastScroll = currentScroll;
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});