document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            header.style.boxShadow = 'none';
        }

        // Hide/show header on scroll
        if (window.scrollY > lastScrollY && window.scrollY > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    // Initialize carousel
    initCarousel();

    // Intersection Observer for animations
    const animateElements = document.querySelectorAll('.destination-carousel, .news-grid, .description-content');
    
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });

    // Destination cards click event
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const destinationName = this.querySelector('h3').textContent;
            alert(`Vous avez sélectionné la destination: ${destinationName}`);
            // Ici vous pourriez rediriger vers une page de détails ou ouvrir un modal
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`Merci de vous être inscrit avec l'adresse: ${emailInput.value}`);
                emailInput.value = '';
                // Ici vous traiteriez normalement l'inscription avec un backend
            }
        });
    }

    // Gestion de la bannière de cookies
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');

    // Vérifie si l'utilisateur a déjà fait un choix
    if (cookieBanner && !localStorage.getItem('cookieConsent')) {
        cookieBanner.style.display = 'flex';
    }

    function setCookieConsent(value) {
        localStorage.setItem('cookieConsent', value);
        cookieBanner.style.display = 'none';
    }

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            setCookieConsent('accepted');
        });
    }
    if (declineCookiesBtn) {
        declineCookiesBtn.addEventListener('click', function() {
            setCookieConsent('declined');
        });
    }

    // Bouton de test pour réinitialiser les cookies
    const resetCookiesBtn = document.getElementById('reset-cookies');
    if (resetCookiesBtn) {
        resetCookiesBtn.addEventListener('click', function() {
            localStorage.removeItem('cookieConsent');
            if (cookieBanner) cookieBanner.style.display = 'flex';
        });
    }
});

// Carousel initialization
function initCarousel() {
    const carousel = document.querySelector('.destination-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    let currentIndex = 0;
    const slideCount = slides.length;
    let visibleSlides = calculateVisibleSlides();

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Calculate visible slides based on screen width
    function calculateVisibleSlides() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 992) return 2;
        return 3;
    }

    // Update carousel position
    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width + 20; // including gap
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.min(Math.max(index, 0), slideCount - visibleSlides);
        updateCarousel();
    }

    function nextSlide() {
        if (currentIndex < slideCount - visibleSlides) {
            currentIndex++;
            updateCarousel();
        } else {
            // Optional: loop back to start
            currentIndex = 0;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Optional: loop to end
            currentIndex = slideCount - visibleSlides;
            updateCarousel();
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-advance (optional)
    let autoSlideInterval = setInterval(nextSlide, 5000);

    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        visibleSlides = calculateVisibleSlides();
        updateCarousel();
    });

    // Initialize position
    updateCarousel();
}