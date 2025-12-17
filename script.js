// Highlight active navigation link
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove .html extension for comparison
    const pageName = currentPage.replace('.html', '');
    
    // Find and highlight active link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').replace('.html', '');
        if (linkPage === pageName || 
            (pageName === '' && linkPage === 'index') ||
            (pageName === 'index' && linkPage === '')) {
            link.classList.add('active');
        }
    });
    
    // Simple form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Gallery modal functionality
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Close modal on click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });
});
