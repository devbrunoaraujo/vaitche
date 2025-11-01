// ===== SMOOTH SCROLL =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const headerHeight = 80;
    const sectionPosition = section.offsetTop - headerHeight;

    window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
    });

    // Close mobile menu if open
    closeMobileMenu();
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Update aria-expanded
    const isExpanded = navLinks.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? 'hidden' : '';
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('header');

function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById('backToTop');

function toggleBackToTop() {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== PERFORMANCE OPTIMIZED SCROLL HANDLER =====
let ticking = false;

function requestTick(callback) {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            callback();
            ticking = false;
        });
        ticking = true;
    }
}

function onScroll() {
    requestTick(() => {
        handleScroll();
        toggleBackToTop();
    });
}

// ===== CLICK OUTSIDE TO CLOSE MENU =====
document.addEventListener('click', (event) => {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    // Check if click is outside menu and toggle button
    if (navLinks.classList.contains('active') &&
        !navLinks.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        closeMobileMenu();
    }
});

// ===== ESCAPE KEY TO CLOSE MENU =====
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        if (navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// ===== KEYBOARD NAVIGATION FOR MENU ITEMS =====
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            link.click();
        }
    });
});

// ===== LAZY LOADING IMAGES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const sectionId = href.substring(1);
            scrollToSection(sectionId);
        });
    });
}

// ===== PARALLAX EFFECT FOR HERO =====
function initParallax() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        requestTick(() => {
            const scrolled = window.pageYOffset;
            const heroShapes = document.querySelectorAll('.hero-shape');
            
            heroShapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    });
}

// ===== FEATURE CARDS STAGGER ANIMATION =====
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== FORM VALIDATION (if needed in future) =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

// ===== PRELOADER (optional) =====
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
}

// ===== ANALYTICS TRACKING (placeholder) =====
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
    console.log('Event tracked:', category, action, label);
}

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    });
});

// ===== VIEWPORT HEIGHT FIX FOR MOBILE =====
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// ===== DETECT TOUCH DEVICE =====
function detectTouch() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
}

// ===== INIT ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initAnimations();
    initLazyLoading();
    initSmoothScroll();
    initParallax();
    initFeatureCards();
    initFormValidation();
    detectTouch();
    setVH();
    
    // Set initial scroll state
    handleScroll();
    toggleBackToTop();
    
    // Hide preloader if exists
    hidePreloader();
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});

// ===== EVENT LISTENERS =====
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', () => {
    setVH();
    closeMobileMenu();
}, { passive: true });

// ===== PERFORMANCE MONITORING =====
if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
                }
            }
        });
        perfObserver.observe({ entryTypes: ['navigation'] });
    } catch (e) {
        console.warn('Performance observer not supported');
    }
}

// ===== SERVICE WORKER REGISTRATION (optional) =====
if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
}

// ===== EXPORT FUNCTIONS FOR INLINE USE =====
window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;