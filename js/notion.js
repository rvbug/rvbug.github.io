//responsive navigation menu toggle
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".nav-items a");

menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active");
});

navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        navigation.classList.remove("active");
    });
});




// Initialize Swiper
const swiper = new Swiper('.mySwiper', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Modal functionality
document.querySelectorAll('.content-btn').forEach((button, index) => {
    button.addEventListener('click', () => {
        // Get the corresponding modal using index + 1
        const modalId = `templateModal${index + 1}`;
        const modal = document.getElementById(modalId);
        
        if (modal) {
            // Show the modal
            modal.style.display = 'block';

            // Reset scroll position
            modal.querySelector('.modal-content').scrollTop = 0;
            
            // Initialize intersection observer for animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1
            });

            // Observe all feature sections
            modal.querySelectorAll('.feature-section').forEach(section => {
                observer.observe(section);
            });
        }
    });
});

// Close modal functionality for all modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

// Close modal when clicking outside of it (for all modals)
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Add escape key handler for all modals
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
}); 
