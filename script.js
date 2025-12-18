// Main JavaScript for Robotics Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 30px rgba(10, 37, 64, 0.1)';
                navLinks.style.gap = '1.5rem';
            }
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => observer.observe(el));
    
    // ===== IMAGE MODAL/GALLERY =====
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const galleryImages = document.querySelectorAll('.gallery-img, .gallery-item');
    
    // Function to open modal with clicked image
    function openModal(imgSrc) {
        modalImage.src = imgSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Add click event to all gallery images
    galleryImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            let imgSrc;
            
            // Check if it's a gallery item with data-src attribute
            if (this.dataset.src) {
                imgSrc = this.dataset.src;
            } else if (this.tagName === 'IMG') {
                imgSrc = this.src;
            } else if (this.querySelector('img')) {
                imgSrc = this.querySelector('img').src;
            }
            
            if (imgSrc) {
                openModal(imgSrc);
            }
        });
    });
    
    // Close modal when clicking close button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ===== NAVBAR SCROLL EFFECT =====
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(10, 37, 64, 0.15)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.boxShadow = '0 5px 20px rgba(10, 37, 64, 0.08)';
            navbar.style.padding = '20px 0';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== SKILL BAR ANIMATION =====
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => skillObserver.observe(bar));
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            // Handle contact button on other pages
            if (href === '#contact' && !window.location.href.includes('index.html')) {
                window.location.href = 'index.html#contact';
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== FORM VALIDATION (FOR CONTACT FORM) =====
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // In a real implementation, you would send this to a server
                // For now, we'll just show a success message
                alert('Thank you for your message! I will respond as soon as possible.');
                this.reset();
                
                // You can implement actual form submission here:
                // fetch('/send-message', {
                //     method: 'POST',
                //     headers: {'Content-Type': 'application/json'},
                //     body: JSON.stringify(data)
                // })
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // ===== DOWNLOAD CV BUTTON FUNCTIONALITY =====
    const downloadBtns = document.querySelectorAll('a[download]');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // In a real implementation, this would trigger a file download
            // For demo purposes, we'll show a message
            if (this.getAttribute('href').includes('cv.pdf') || 
                this.getAttribute('href').includes('thesis.pdf')) {
                e.preventDefault();
                alert('In a real implementation, this would download the file. For demo purposes, the button is functional.');
                
                // Simulate download delay
                setTimeout(() => {
                    // You can implement actual download here:
                    // window.location.href = this.getAttribute('href');
                }, 1000);
            }
        });
    });
    
    // ===== RESPONSIVE ADJUSTMENTS =====
    function handleResize() {
        // Reset mobile menu display on larger screens
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    }
    
    // Initial call
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    // ===== ADDITIONAL ANIMATIONS =====
    
    // Add hover effect to education cards
    const eduCards = document.querySelectorAll('.education-card, .activity-card, .certificate-card');
    
    eduCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to hero quote (optional)
    const heroQuote = document.querySelector('.main-quote');
    
    if (heroQuote && window.innerWidth > 768) {
        const originalText = heroQuote.textContent;
        heroQuote.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroQuote.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    function highlightActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Check if this link corresponds to current page
            if ((currentPage === 'index.html' && linkPage === 'index.html') ||
                (currentPage !== 'index.html' && linkPage === currentPage)) {
                link.classList.add('active');
            }
        });
    }
    
    // Call initially
    highlightActiveNavLink();
    
    // ===== EXTERNAL LINK WARNING =====
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', function(e) {
                // Optional: Add confirmation for external links
                // if (!confirm('You are about to leave this site. Continue?')) {
                //     e.preventDefault();
                // }
            });
        }
    });
    
    // ===== LOADING ANIMATION =====
    // Simple loading animation for images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        img.addEventListener('load', function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        });
        
        // Handle error
        img.addEventListener('error', function() {
            this.classList.remove('loading');
            this.classList.add('error');
            console.log('Failed to load image:', this.src);
        });
    });
    
    // Add CSS for loading animation
    const style = document.createElement('style');
    style.textContent = `
        img.loading {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        img.loaded {
            opacity: 1;
        }
        img.error {
            opacity: 0.5;
            filter: grayscale(100%);
        }
    `;
    document.head.appendChild(style);
});
