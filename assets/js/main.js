// main.js
/**
 * Tala Khaddour Portfolio - Main JavaScript
 * Vanilla JS implementation for all interactive features
 * WCAG AA compliant, no external dependencies
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initLightbox();
    initBackToTop();
    initCurrentYear();
    initGallery();
    initLanguageToggle();
    initSmoothScrolling();
    
    // Add keyboard navigation for lightbox
    initKeyboardNavigation();
});

/**
 * Mobile Navigation Toggle
 * Inspired by al-folio's clean hamburger implementation
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Update aria attributes for accessibility
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
        navLinks.setAttribute('aria-hidden', !isExpanded);
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('aria-hidden', 'true');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInside = hamburger.contains(event.target) || navLinks.contains(event.target);
        if (!isClickInside && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('aria-hidden', 'true');
        }
    });
}

/**
 * Lightbox Gallery System
 * Supports touch swipe, keyboard navigation, and WCAG AA compliance
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const overlay = document.getElementById('lightbox-overlay');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const downloadBtn = document.querySelector('.lightbox-download');
    const lightboxImage = document.querySelector('.lightbox-image');
    const imageTitle = document.querySelector('.image-title');
    const imageDescription = document.querySelector('.image-description');
    
    let currentIndex = 0;
    let images = [];
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Collect all gallery images
    function collectImages() {
        const galleryItems = document.querySelectorAll('.gallery-link, .image-link');
        images = Array.from(galleryItems).map(item => ({
            src: item.href.includes('#') ? item.querySelector('img').src : item.href,
            alt: item.querySelector('img')?.alt || '',
            title: item.querySelector('img')?.dataset.title || '',
            description: item.querySelector('img')?.dataset.description || '',
            download: item.querySelector('img')?.dataset.download || item.querySelector('img')?.src
        }));
        
        // Add click handlers to gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                if (item.href.includes('#')) {
                    e.preventDefault();
                    openLightbox(index);
                }
            });
        });
    }
    
    // Open lightbox at specific index
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Move focus to lightbox for keyboard navigation
        lightbox.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        lightbox.setAttribute('aria-hidden', 'true');
    }
    
    // Update lightbox content
    function updateLightbox() {
        if (images.length === 0) return;
        
        const image = images[currentIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        imageTitle.textContent = image.title;
        imageDescription.textContent = image.description;
        downloadBtn.dataset.download = image.download;
        
        // Update button states
        prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
        nextBtn.style.display = currentIndex < images.length - 1 ? 'flex' : 'none';
    }
    
    // Navigation functions
    function nextImage() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateLightbox();
        }
    }
    
    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightbox();
        }
    }
    
    // Touch swipe support
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage(); // Swipe left
            } else {
                prevImage(); // Swipe right
            }
        }
    }
    
    // Event Listeners
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = this.dataset.download;
        link.download = this.dataset.download.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // Touch events for mobile
    lightbox.addEventListener('touchstart', handleTouchStart, { passive: true });
    lightbox.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Initialize
    collectImages();
}

/**
 * Back to Top Button
 * Shows when user scrolls down 600px
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    function toggleBackToTop() {
        if (window.pageYOffset > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Initial check
    toggleBackToTop();
}

/**
 * Update copyright year automatically
 */
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize gallery interactions
 */
function initGallery() {
    // Add loading="lazy" to all gallery images
    document.querySelectorAll('.gallery-item img, .edu-image img').forEach(img => {
        if (!img.loading) {
            img.loading = 'lazy';
        }
    });
    
    // Add image description data attributes
    const imageData = {
        'manara-graduation.jpg': {
            title: 'Graduation Ceremony',
            description: 'Celebrating B.Sc. completion at Manara University'
        },
        'ncd-campus.jpg': {
            title: 'NCD Campus',
            description: 'National Center for the Distinguished campus'
        }
    };
    
    // Apply data attributes to images
    document.querySelectorAll('img').forEach(img => {
        const filename = img.src.split('/').pop();
        if (imageData[filename]) {
            img.dataset.title = imageData[filename].title;
            img.dataset.description = imageData[filename].description;
        }
    });
}

/**
 * Language Toggle (Placeholder)
 * Structure for future multilingual support
 */
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            
            // Update active state
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // In a real implementation, this would load translations
            console.log(`Language switched to: ${lang}`);
            
            // Update document language attribute
            document.documentElement.lang = lang;
            
            // For Arabic RTL support
            if (lang === 'ar') {
                document.documentElement.dir = 'rtl';
            } else {
                document.documentElement.dir = 'ltr';
            }
        });
    });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Keyboard Navigation for Lightbox
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                document.querySelector('.lightbox-close').click();
                break;
            case 'ArrowLeft':
                document.querySelector('.lightbox-prev').click();
                break;
            case 'ArrowRight':
                document.querySelector('.lightbox-next').click();
                break;
        }
    });
}

/**
 * Filter functionality for volunteer page
 */
function initVolunteerFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const volunteerItems = document.querySelectorAll('.volunteer-item');
    
    if (!filterButtons.length || !volunteerItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            volunteerItems.forEach(item => {
                const categories = item.dataset.category.split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Skill chips modal functionality
 */
function initSkillChips() {
    const skillChips = document.querySelectorAll('.skill-chip');
    
    skillChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const skill = this.dataset.skill;
            openSkillModal(skill);
        });
    });
    
    function openSkillModal(skill) {
        // This would open a modal with skill details
        // For now, just log to console
        console.log(`Opening modal for skill: ${skill}`);
        
        // Example modal content based on skill
        const skillDetails = {
            'robotics': {
                title: 'Robotics Engineering',
                description: 'Experience with robotic arm control, path planning, and sensor integration.',
                examples: ['Hand Exoskeleton Project', 'ROS Navigation Stack']
            },
            'python': {
                title: 'Python Programming',
                description: 'Advanced Python for data analysis, machine learning, and robotics control.',
                examples: ['OpenCV for vision', 'TensorFlow for AI', 'ROS Python API']
            }
        };
        
        // In a real implementation, this would show a modal
        alert(`Skill: ${skill}\n\nDetails would appear in a modal with links to projects.`);
    }
}

/**
 * Certificate carousel for skills page
 */
function initCertificateCarousel() {
    const carousel = document.querySelector('.certificate-carousel');
    if (!carousel) return;
    
    const scrollAmount = 300;
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
}

/**
 * Form handling for contact (mailto fallback)
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('[name="name"]').value;
        const email = this.querySelector('[name="email"]').value;
        const message = this.querySelector('[name="message"]').value;
        
        // Create mailto link
        const subject = `Portfolio Contact: ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        
        const mailtoLink = `mailto:khaddour.tala@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
    });
}

// Export functions for use in other pages
window.portfolio = {
    initNavigation,
    initLightbox,
    initVolunteerFilter,
    initSkillChips,
    initCertificateCarousel,
    initContactForm
};
