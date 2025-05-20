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

    // Smooth scrolling for anchor links with improved easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced header scroll effect with transition
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
                    header.style.height = '70px';
                } else {
                    header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    header.style.boxShadow = 'none';
                    header.style.height = '90px';
                }

                // Smart hide/show header on scroll
                if (window.scrollY > lastScrollY && window.scrollY > 300) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                lastScrollY = window.scrollY;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize parallax effect for hero section
    initParallax();

    // Intersection Observer for staggered animations
    const animateElements = document.querySelectorAll('.feature-card, .fun-card, .approach-visual, .approach-text');
    
    const options = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for smoother appearance
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
            
            const icon = this.querySelector('img');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.4s ease-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            
            const icon = this.querySelector('img');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Animate benefits list with staggered appearance
    const benefitsItems = document.querySelectorAll('.benefits-list li');
    benefitsItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease-out';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 150));
    });

    // Glowing effect for CTA buttons
    const ctaButtons = document.querySelectorAll('.glow-on-hover, .button');
    ctaButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.background = `radial-gradient(circle at ${x}px ${y}px, #ff9f1a, #FF9500)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = '#FF9500';
        });
    });

    // Add typing animation effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typingSpeed = 50; // ms per character
        
        function typeText() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeText, typingSpeed);
            } else {
                // Add blinking cursor at the end
                heroTitle.innerHTML = heroTitle.textContent + '<span class="cursor">|</span>';
                setInterval(() => {
                    const cursor = document.querySelector('.cursor');
                    if (cursor) {
                        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                    }
                }, 500);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeText, 500);
    }
    
    // Add subtle animation to the hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 1s ease-out';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 1500); // Start after title animation
    }
    
    // Add pulse animation to hero CTA button
    const heroCta = document.querySelector('.hero .glow-on-hover');
    if (heroCta) {
        heroCta.style.opacity = '0';
        heroCta.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            heroCta.style.transition = 'all 0.8s ease-out';
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'scale(1)';
            
            // Add pulse animation
            setInterval(() => {
                heroCta.style.transform = 'scale(1.05)';
                heroCta.style.boxShadow = '0 10px 30px rgba(255, 149, 0, 0.6)';
                
                setTimeout(() => {
                    heroCta.style.transform = 'scale(1)';
                    heroCta.style.boxShadow = '0 5px 20px rgba(255, 149, 0, 0.4)';
                }, 500);
            }, 3000);
        }, 2500); // Start after subtitle animation
    }
    
    // Add 3D tilt effect to images
    const tiltImages = document.querySelectorAll('.approach-visual img, .multiplayer-section img');
    tiltImages.forEach(img => {
        img.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
            const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
            
            this.style.transform = `perspective(1000px) rotateY(${xPercent * 5}deg) rotateX(${yPercent * -5}deg) scale(1.02)`;
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
        });
    });
});

// Parallax effect for hero section
function initParallax() {
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const video = document.querySelector('.hero video');
    
    if (!heroSection || !video) return;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        // Parallax effect for video
        if (scrollPosition <= heroSection.offsetHeight) {
            video.style.transform = `translateY(${scrollPosition * 0.25}px)`;
            
            // Fade out hero content as user scrolls
            if (heroContent) {
                heroContent.style.opacity = 1 - (scrollPosition / (heroSection.offsetHeight / 1.5));
                heroContent.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        }
    });
}

// Add CSS for cursor blinking
const style = document.createElement('style');
style.textContent = `
    .cursor {
        font-weight: normal;
        animation: blink 1s infinite;
    }
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);