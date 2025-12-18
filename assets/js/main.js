// Innovative Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CURRENT YEAR =====
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // ===== NAVIGATION SCROLL EFFECT =====
    const mainNav = document.getElementById('mainNav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            mainNav.classList.add('nav-scrolled');
        } else {
            mainNav.classList.remove('nav-scrolled');
        }
        
        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            mainNav.style.transform = 'translateY(-100%)';
        } else {
            mainNav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== MOBILE MENU =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-container') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== FORM SUBMISSION =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            
            // Simple validation
            if (!formObject.name || !formObject.email || !formObject.message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!validateEmail(formObject.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you for your message! I will respond soon.', 'success');
            this.reset();
            
            // In a real application, you would send data to a server here
            console.log('Form submitted:', formObject);
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#5D4037' : '#BCAAA4'};
            color: #F8F5F0;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(93, 64, 55, 0.2);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: slideIn 0.3s ease;
        `;
        
        // Add close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Add to document
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(style);
    
    // ===== IMAGE GALLERY MODAL =====
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-backdrop"></div>
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <img src="${imgSrc}" alt="${imgAlt}">
                </div>
            `;
            
            // Add styles
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9998;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            `;
            
            const backdrop = modal.querySelector('.modal-backdrop');
            backdrop.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(93, 64, 55, 0.9);
                backdrop-filter: blur(10px);
            `;
            
            const content = modal.querySelector('.modal-content');
            content.style.cssText = `
                position: relative;
                z-index: 1;
                max-width: 90%;
                max-height: 90%;
                animation: scaleIn 0.3s ease;
            `;
            
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -50px;
                right: 0;
                background: none;
                border: none;
                color: #F8F5F0;
                font-size: 2.5rem;
                cursor: pointer;
                transition: transform 0.3s ease;
            `;
            
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.transform = 'rotate(90deg)';
            });
            
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.transform = 'rotate(0deg)';
            });
            
            content.querySelector('img').style.cssText = `
                max-width: 100%;
                max-height: calc(90vh - 50px);
                object-fit: contain;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            `;
            
            // Add modal styles
            const modalStyle = document.createElement('style');
            modalStyle.textContent = `
                @keyframes scaleIn {
                    from {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                
                @keyframes scaleOut {
                    from {
                        transform: scale(1);
                        opacity: 1;
                    }
                    to {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(modalStyle);
            
            // Close functionality
            function closeModal() {
                content.style.animation = 'scaleOut 0.3s ease';
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                }, 300);
            }
            
            closeBtn.addEventListener('click', closeModal);
            backdrop.addEventListener('click', closeModal);
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeModal();
            });
            
            // Add to document
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
        });
    });
    
    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
    
    // ===== PROFILE IMAGE FALLBACK =====
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('error', function() {
            console.log('Profile image failed to load, trying fallbacks...');
            
            const fallbacks = [
                'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'assets/images/profile.jpg',
                'assets/images/profile.jpeg',
                'assets/images/profile.png'
            ];
            
            let currentIndex = 0;
            const tryNext = () => {
                if (currentIndex < fallbacks.length) {
                    this.src = fallbacks[currentIndex];
                    currentIndex++;
                }
            };
            
            this.onerror = null;
            setTimeout(tryNext, 100);
        });
    }
    
    // ===== PARALLAX EFFECT =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const profileOrb = document.querySelector('.profile-orb');
        
        if (profileOrb) {
            profileOrb.style.transform = `translateY(${scrolled * 0.05}px) rotate(${scrolled * 0.01}deg)`;
        }
        
        // Animate orb decorations
        document.querySelectorAll('.orb-decoration').forEach((orb, index) => {
            orb.style.transform = `rotate(${scrolled * 0.005 * (index + 1)}deg)`;
        });
    });
    
    // ===== ACTIVE NAV LINK =====
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (currentPage === linkPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === '')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNavLink();
});
