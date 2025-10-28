// Main JavaScript for Milk Classic Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for order buttons
    const orderButtons = document.querySelectorAll('#orderBtn, #heroOrderBtn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const orderSection = document.getElementById('order');
            if (orderSection) {
                orderSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.card-shadow, .hover-scale');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Mobile menu functionality (if needed in future)
    const initMobileMenu = () => {
        // Mobile menu code can be added here if navigation becomes more complex
    };
    
    // Flavor card interactions
    const flavorCards = document.querySelectorAll('.hover-scale');
    flavorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Order form simulation
    const orderButton = document.querySelector('.bg-yellow-400');
    if (orderButton) {
        orderButton.addEventListener('click', function() {
            // Simulate order process
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Обрабатываем...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('Спасибо за интерес к Milk Classic! В реальном магазине здесь была бы форма заказа.');
                this.innerHTML = 'Оформить заказ';
                this.disabled = false;
            }, 2000);
        });
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.gradient-bg');
    const heroDecorations = document.querySelectorAll('.absolute');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        heroDecorations.forEach((decoration, index) => {
            const speed = parallaxSpeed * (index + 1);
            decoration.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Dynamic stats animation
    const animateStats = () => {
        const statsElements = document.querySelectorAll('.text-3xl.font-bold');
        statsElements.forEach((stat, index) => {
            const text = stat.textContent;
            if (text.includes('#1')) {
                animateNumber(stat, 1, '#', '');
            } else if (text.includes('5★')) {
                animateNumber(stat, 5, '', '★');
            } else if (text.includes('100%')) {
                animateNumber(stat, 100, '', '%');
            }
        });
    };
    
    const animateNumber = (element, target, prefix = '', suffix = '') => {
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = prefix + Math.floor(current) + suffix;
        }, 30);
    };
    
    // Trigger stats animation when section is visible
    const statsSection = document.querySelector('.py-20.gradient-bg');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // Add loading animation
    const addLoadingAnimation = () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    };
    
    addLoadingAnimation();
    
    // Touch gesture support for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            // Add swipe functionality if needed
            console.log(diff > 0 ? 'Swipe up' : 'Swipe down');
        }
    };
    
    // Performance optimization: debounce scroll events
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    // Optimized scroll handler
    const optimizedScrollHandler = debounce(() => {
        // Add any additional scroll-based functionality here
    }, 10);
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    const videoBtn = document.getElementById('watchVideoBtn');
    if (videoBtn) {
    videoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://www.youtube.com/watch?v=LFueHJciS1A', '_blank', 'noopener,noreferrer');
        // If you prefer same tab instead, use:
        // window.location.href = 'https://www.youtube.com/watch?v=LFueHJciS1A';
    });
    }

    console.log('Milk Classic website loaded successfully! 🍪');
});

