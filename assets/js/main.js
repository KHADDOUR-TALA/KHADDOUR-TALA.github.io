/**
 * Academic Portfolio - Minimal JavaScript
 * Tala Khaddour - Robotics & Intelligent Systems Engineer
 * 
 * Functions:
 * 1. Mobile navigation toggle
 * 2. Image lightbox for education photos
 * 3. Accessibility enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded attribute
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle menu visibility
            navMenu.setAttribute('aria-hidden', isExpanded);
            navMenu.classList.toggle('active');
            
            // Update toggle button state
            this.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });
    }
    
    // Image Lightbox
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (lightbox && lightboxImage && lightboxCaption && lightboxClose) {
        const educationImages = document.querySelectorAll('[data-lightbox]');
        
        educationImages.forEach(img => {
            img.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Set lightbox content
                lightboxImage.src = this.src;
                lightboxImage.alt = this.alt;
                lightboxCaption.textContent = this.alt;
                
                // Show lightbox
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                
                // Focus the close button for accessibility
                setTimeout(() => lightboxClose.focus(), 100);
            });
            
            // Make images keyboard accessible
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            
            img.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.click();
                }
            });
        });
        
        // Close lightbox function
        function closeLightbox() {
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            
            // Return focus to the clicked image
            const activeImage = document.querySelector('[data-lightbox]:focus');
            if (activeImage) {
                activeImage.focus();
            }
        }
        
        // Close lightbox on button click
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close lightbox on background click
        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
                closeLightbox();
            }
        });
    }
    
    // External link indicators (adds visually hidden text for screen readers)
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        if (!link.querySelector('.sr-only')) {
            const srText = document.createElement('span');
            srText.className = 'sr-only';
            srText.textContent = ' (opens in new window)';
            link.appendChild(srText);
        }
        
        // Add noreferrer and noopener for security
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Print-friendly optimizations
    window.addEventListener('beforeprint', function() {
        // Add print-specific class for styling
        document.body.classList.add('printing');
        
        // Make sure all links show URLs
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            if (!link.getAttribute('href').startsWith('#')) {
                const url = document.createElement('span');
                url.className = 'print-url';
                url.textContent = ' (' + link.href + ')';
                link.appendChild(url);
            }
        });
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
        
        // Remove added URL spans
        const printUrls = document.querySelectorAll('.print-url');
        printUrls.forEach(url => url.remove());
    });
    
    // Smooth scrolling for anchor links (optional enhancement)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#main-content') {
                event.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // Lazy loading for images (optional enhancement)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
