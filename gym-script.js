// Initialize Lucide icons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initMobileMenu();
    initScrollAnimations();
});

// Navigation scroll effect
function initNavigation() {
    const nav = document.getElementById('navigation');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('[data-scroll]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
                const closeIcon = mobileMenuBtn.querySelector('.close-icon');
                
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Show success message
            showToast('Message sent successfully!', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const newsletterBtn = newsletterForm.querySelector('.btn');
        const newsletterInput = newsletterForm.querySelector('input');
        
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterInput.value;
            
            if (!email) {
                showToast('Please enter your email address', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            showToast('Successfully subscribed to newsletter!', 'success');
            newsletterInput.value = '';
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = !mobileMenu.classList.contains('hidden');
            
            if (isOpen) {
                // Close menu
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                // Open menu
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards, trainer cards, and membership cards
    const animatedElements = document.querySelectorAll('.service-card, .trainer-card, .membership-card, .contact-info-card');
    
    animatedElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(el);
    });
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    const toastIcon = toast.querySelector('.toast-icon i');
    
    if (toast) {
        // Set content
        if (type === 'success') {
            toastTitle.textContent = 'Success!';
            toastIcon.setAttribute('data-lucide', 'check-circle');
            toastIcon.style.color = '#10b981';
        } else {
            toastTitle.textContent = 'Error!';
            toastIcon.setAttribute('data-lucide', 'x-circle');
            toastIcon.style.color = '#ef4444';
        }
        
        toastDescription.textContent = message;
        
        // Show toast
        toast.classList.remove('hidden');
        toast.classList.add('show');
        
        // Reinitialize icon
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Hide after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 300);
        }, 4000);
    }
}

// Button interaction effects
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        
        // Add click effect
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
    }
});

// Smooth scroll for internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states for buttons
function addButtonLoading(button) {
    button.disabled = true;
    button.style.opacity = '0.7';
    button.style.cursor = 'not-allowed';
    
    setTimeout(() => {
        button.disabled = false;
        button.style.opacity = '';
        button.style.cursor = '';
    }, 2000);
}

// Handle CTA button clicks
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn');
    if (btn && (btn.textContent.includes('Join Now') || btn.textContent.includes('Get Started') || btn.textContent.includes('Choose Plan'))) {
        e.preventDefault();
        addButtonLoading(btn);
        showToast('Thank you for your interest! We will contact you soon.', 'success');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects for service cards
document.addEventListener('mouseenter', function(e) {
    if (e.target.classList.contains('service-card')) {
        e.target.style.transform = 'translateY(-5px)';
    }
}, true);

document.addEventListener('mouseleave', function(e) {
    if (e.target.classList.contains('service-card')) {
        e.target.style.transform = '';
    }
}, true);

// Add typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect for hero title (uncomment if desired)
/*
window.addEventListener('load', function() {
    const heroTitleSpan = document.querySelector('.hero-title-gradient');
    if (heroTitleSpan) {
        typeWriter(heroTitleSpan, 'BODY & MIND', 150);
    }
});
*/

// Add smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.animate-slide-up');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add custom cursor effect for interactive elements
document.addEventListener('mousemove', function(e) {
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .service-card, .trainer-card, .membership-card');
    
    interactiveElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            el.style.setProperty('--mouse-x', x + 'px');
            el.style.setProperty('--mouse-y', y + 'px');
        }
    });
});

// Handle image loading errors
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
        const closeIcon = mobileMenuBtn.querySelector('.close-icon');
        
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
        
        // Close any open toasts
        const toast = document.getElementById('toast');
        if (toast && !toast.classList.contains('hidden')) {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 300);
        }
    }
});