gsap.registerPlugin(ScrollTrigger);

// Hero animations
gsap.to('.hero-content h1', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.to('.hero-content p', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
});

// Stat boxes animation
gsap.to('.stat-box', {
    scrollTrigger: {
        trigger: '.stats-container',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// Counter animations
function animateCounter(element, target, unit = '') {
    let obj = { value: 0 };

    gsap.to(obj, {
        scrollTrigger: {
            trigger: '.stats-container',
            start: 'top center+=100'
        },
        value: target,
        duration: 2,
        onUpdate: () => {
            element.textContent = Math.round(obj.value) + unit;
        }
    });
}

animateCounter(document.getElementById('keyCount'), 34);
animateCounter(document.getElementById('layerCount'), 3);
animateCounter(document.getElementById('customPercent'), 100, '%');

// Section title animations
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.to(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// Card animations
gsap.utils.toArray('.card').forEach(card => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=50',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});



// Modal functionality
const modals = {
    proMicro: document.getElementById('proMicroModal'),
    niceNano: document.getElementById('niceNanoModal'),
    elite: document.getElementById('eliteModal'),
    // Add other modals here
};

console.log(modals);

// Open modal
document.querySelectorAll('.plus-button').forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.dataset.modal + 'Modal';
        const modal = document.getElementById(modalId);
        console.log(modal)
        if (modal) {
            modal.classList.add('active');
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.classList.remove('active');
        // Restore body scrolling
        document.body.style.overflow = '';
    });
});

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});


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



