document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.feature-card, .agents-container, .terminal-card, .config-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add parallax effect to background orbs
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const orb1 = document.querySelector('.orb-1');
        const orb2 = document.querySelector('.orb-2');
        
        if (orb1 && orb2) {
            orb1.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
            orb2.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
        }
    });

    // Screenshot slider
    const slides = document.querySelectorAll('.mockup-img');
    const dots = document.querySelectorAll('.dot-item');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.slide);
            showSlide(slideIndex);
            clearInterval(slideInterval);
            startSlider();
        });
    });

    // Start auto slider
    if (slides.length > 1) {
        startSlider();
    }
});
