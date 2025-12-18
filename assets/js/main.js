/**
 * Enhanced Academic Portfolio JavaScript
 * Clean, minimal functionality for scholarship portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle navigation
            this.setAttribute('aria-expanded', !isExpanded);
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
        
        // Close menu on link click
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active') &&
                !navToggle.contains(event.target) &&
                !navMenu.contains(event.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });
    }
    
    // Image Lightbox
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    if (lightbox && lightboxImage) {
        const educationImages = document.querySelectorAll('[data-lightbox]');
        
        educationImages.forEach(img => {
            // Make images keyboard accessible
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', 'Open image in lightbox');
            
            img.addEventListener('click', function() {
                openLightbox(this.src, this.alt);
            });
            
            img.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openLightbox(this.src, this.alt);
                }
            });
        });
        
        function openLightbox(src, alt) {
            lightboxImage.src = src;
            lightboxImage.alt = alt;
            lightboxCaption.textContent = alt;
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Focus close button for accessibility
            setTimeout(() => lightboxClose.focus(), 100);
        }
        
        function closeLightbox() {
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            
            // Return focus to the clicked image
            const activeImage = document.querySelector('[data-lightbox]:focus');
            if (activeImage) {
                activeImage.focus();
            }
        }
        
        lightboxClose.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
        
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
                closeLightbox();
            }
        });
    }
    
    // Add external link indicators for screen readers
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        if (!link.querySelector('.sr-only')) {
            const indicator = document.createElement('span');
            indicator.className = 'sr-only';
            indicator.textContent = ' (opens in new window)';
            link.appendChild(indicator);
        }
        
        // Ensure security attributes
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                event.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight - 20,
                        behavior: 'smooth'
                    });
                    
                    // Update URL
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // Print optimization
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('print-mode');
        
        // Show URLs for external links
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            const urlSpan = document.createElement('span');
            urlSpan.className = 'print-url';
            urlSpan.textContent = ' (' + link.href + ')';
            urlSpan.style.fontSize = '0.9em';
            urlSpan.style.opacity = '0.7';
            link.appendChild(urlSpan);
        });
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('print-mode');
        document.querySelectorAll('.print-url').forEach(span => span.remove());
    });
    
    // Add loading animation for images (optional enhancement)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
});
