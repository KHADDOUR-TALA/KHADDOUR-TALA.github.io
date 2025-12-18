// Professional Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CURRENT YEAR =====
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // ===== NAVIGATION SCROLL EFFECT =====
    const mainNav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            mainNav.classList.add('nav-scrolled');
        } else {
            mainNav.classList.remove('nav-scrolled');
        }
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
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // ===== IMAGE MODAL =====
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    
    // Open modal when gallery images are clicked
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                imageModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal functionality
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                imageModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && imageModal.style.display === 'flex') {
                imageModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    
    // ===== PROFILE IMAGE FALLBACK =====
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.addEventListener('error', function() {
            console.log('Profile image failed to load, using fallback...');
            
            // Try multiple sources
            const fallbacks = [
                'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'assets/images/profile.jpg',
                'assets/images/profile.jpeg',
                'assets/images/profile.png',
                'assets/images/Profile.jpg'
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
    
    // ===== FRAME ANIMATION =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const profileFrame = document.querySelector('.profile-frame-large');
        
        if (profileFrame) {
            profileFrame.style.transform = `translateY(${scrolled * 0.05}px) rotate(${scrolled * 0.01}deg)`;
        }
        
        // Animate decorations
        document.querySelectorAll('.frame-decoration').forEach((dec, index) => {
            dec.style.transform = `rotate(${scrolled * 0.005 * (index + 1)}deg)`;
        });
    });
    
    // ===== FORM VALIDATION (if you add forms later) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! I will respond soon.');
            this.reset();
        });
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
