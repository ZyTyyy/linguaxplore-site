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

    // Intersection Observer for animations
    const animateElements = document.querySelectorAll('.destination-buttons, .news-buttons, .description-content');
    
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

    // Destination buttons click event
    const destinationButtons = document.querySelectorAll('.destination-button');
    destinationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const destinationName = this.querySelector('h3').textContent;
            alert(`Vous avez sélectionné la destination: ${destinationName}`);
            // Ici vous pourriez rediriger vers une page de détails ou ouvrir un modal
        });
    });

    // News buttons click event
    const newsButtons = document.querySelectorAll('.news-button');
    newsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newsTitle = this.querySelector('h3').textContent;
            alert(`Actualité: ${newsTitle}`);
            // Ici vous pourriez rediriger vers une page d'actualité ou ouvrir un modal
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
});