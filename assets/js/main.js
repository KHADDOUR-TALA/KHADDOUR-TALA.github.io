// Simple JavaScript for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CURRENT YEAR =====
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
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
    
    // ===== FADE IN ANIMATIONS =====
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    fadeElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    // ===== PROFILE IMAGE FALLBACK =====
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            console.log('Profile image failed to load, using fallback...');
            
            // Try different image sources
            const fallbacks = [
                'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
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
});
