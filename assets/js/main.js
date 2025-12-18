/**
 * Visual Academic Portfolio - JavaScript
 * Location: /assets/js/main.js
 * Clean, minimal functionality for image-driven portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ==========================================================================
    // Mobile Navigation
    // ==========================================================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle navigation
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = isExpanded ? '' : 'hidden';
            
            // Update hamburger animation
            if (isExpanded) {
                this.classList.remove('active');
            } else {
                this.classList.add('active');
            }
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
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
    
    // ==========================================================================
    // Image Lightbox
    // ==========================================================================
    
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // Open lightbox on image click
    const lightboxImages = document.querySelectorAll('[data-lightbox]');
    const expandButtons = document.querySelectorAll('.image-expand');
    
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
        
        // Return focus to the clicked element
        const activeElement = document.querySelector('[data-lightbox]:focus, .image-expand:focus');
        if (activeElement) {
            activeElement.focus();
        }
    }
    
    // Setup image click handlers
    lightboxImages.forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
        
        // Make images keyboard accessible
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'Click to view larger image');
        
        img.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openLightbox(img.src, img.alt);
            }
        });
    });
    
    // Setup expand button handlers
    expandButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const img = button.closest('.image-container').querySelector('img');
            openLightbox(img.src, img.alt);
        });
        
        button.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                event.stopPropagation();
                const img = button.closest('.image-container').querySelector('img');
                openLightbox(img.src, img.alt);
            }
        });
    });
    
    // Lightbox close handlers
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
            closeLightbox();
        }
    });
    
    // ==========================================================================
    // Accessibility Enhancements
    // ==========================================================================
    
    // Add screen reader text to external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        if (!link.querySelector('.sr-only')) {
            const srText = document.createElement('span');
            srText.className = 'sr-only';
            srText.textContent = ' (opens in new window)';
            link.appendChild(srText);
        }
        
        // Ensure security attributes
        if (!link.getAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // ==========================================================================
    // Smooth Scrolling
    // ==========================================================================
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                event.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
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
    
    // ==========================================================================
    // Print Optimization
    // ==========================================================================
    
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
        
        // Add URLs to external links for print
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
        document.body.classList.remove('printing');
        document.querySelectorAll('.print-url').forEach(span => span.remove());
    });
    
    // ==========================================================================
    // Image Loading Enhancement
    // ==========================================================================
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                this.style.opacity = '1';
                this.alt = 'Image not available';
            });
        }
    });
});
