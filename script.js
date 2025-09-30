const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}));


document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

const themeToggleBtn = document.getElementById('theme-toggle');
const userThemePreference = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
        document.body.classList.remove('dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const initialTheme = userThemePreference || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);
});

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        applyTheme(isDark ? 'dark' : 'light');
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .model-card, .gallery-item, .about-text, .about-image');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
    let currentId = '';
    const fromTop = window.scrollY + 120;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const bottom = top + section.offsetHeight;
        if (fromTop >= top && fromTop <= bottom) {
            currentId = section.id;
        }
    });
    navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('#') && href.slice(1) === currentId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav, { passive: true });
window.addEventListener('load', setActiveNav);

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-nav">
            <button class="lightbox-prev">&larr;</button>
            <button class="lightbox-next">&rarr;</button>
        </div>
    </div>
`;

const lightboxStyles = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    }
    
    .lightbox.active {
        display: flex;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-image {
        max-width: 100%;
        max-height: 100%;
        border-radius: 10px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.5);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
        pointer-events: none;
    }
    
    .lightbox-prev,
    .lightbox-next {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        pointer-events: all;
        transition: background 0.3s ease;
    }
    
    .lightbox-prev:hover,
    .lightbox-next:hover {
        background: rgba(0, 0, 0, 0.8);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

document.body.appendChild(lightbox);

let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems);

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        showLightbox();
    });
});

function showLightbox() {
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const currentItem = galleryImages[currentImageIndex];
    const bikePlaceholder = currentItem.querySelector('.bike-placeholder');
    const actualImage = currentItem.querySelector('img');
    
    if (actualImage) {
        
        lightboxImg.src = actualImage.src;
        lightboxImg.alt = actualImage.alt || 'Gallery Image';
    } else if (bikePlaceholder) {
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 300;
        
        
        ctx.fillStyle = bikePlaceholder.style.background || '#e74c3c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        /
        ctx.font = '80px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🏍️', canvas.width / 2, canvas.height / 2 + 30);
        
        lightboxImg.src = canvas.toDataURL();
        lightboxImg.alt = 'Motorcycle Placeholder';
    }
    
    lightbox.classList.add('active');
}


lightbox.querySelector('.lightbox-close').addEventListener('click', hideLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showLightbox();
});
lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showLightbox();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        hideLightbox();
    }
});

function hideLightbox() {
    lightbox.classList.remove('active');
}

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            hideLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            showLightbox();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            showLightbox();
        }
    }
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification-success {
            background: #27ae60;
        }
        
        .notification-error {
            background: #e74c3c;
        }
        
        .notification-info {
            background: #3498db;
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = notificationStyles;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        newsletterForm.reset();
    });
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const loadedStyles = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = loadedStyles;
    document.head.appendChild(style);
});

const revealElements = document.querySelectorAll('.features, .models, .gallery, .about, .contact');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(el);
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

function loadResponsiveImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        
        document.body.classList.add('mobile-optimized');
        
        document.body.classList.add('touch-device');
        
        let ticking = false;
        
        function updateScroll() {
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
}

function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function handleOrientationChange() {
    setTimeout(() => {
        setViewportHeight();
        optimizeForMobile();
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    setViewportHeight();
    optimizeForMobile();
    loadResponsiveImages();
});

window.addEventListener('resize', () => {
    setViewportHeight();
    optimizeForMobile();
});

window.addEventListener('orientationchange', handleOrientationChange);

if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('.lazy');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

if (window.innerWidth <= 768) {
    document.body.classList.add('mobile');
} else if (window.innerWidth <= 1024) {
    document.body.classList.add('tablet');
} else {
    document.body.classList.add('desktop');
}

window.addEventListener('resize', () => {
    document.body.classList.remove('mobile', 'tablet', 'desktop');
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile');
    } else if (window.innerWidth <= 1024) {
        document.body.classList.add('tablet');
    } else {
        document.body.classList.add('desktop');
    }
});

const rippleStyles = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleStyles;
document.head.appendChild(rippleStyleSheet);
