// Initialize Swiper immediately after DOM content loads
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            480: {
                slidesPerView: 'auto',
                spaceBetween: 30
            }
        }
    });
});

// Three.js Stars Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('black-hole-canvas'),
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create stars
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 7000; // Increased number of stars
const posArray = new Float32Array(particlesCount * 3);

// Create stars in a more spread out, spherical distribution
for (let i = 0; i < particlesCount * 3; i += 3) {
    // Use spherical coordinates for better distribution
    const radius = Math.random() * 100; // Increased radius for more depth
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
    posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    posArray[i + 2] = radius * Math.cos(phi);
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Create different sized stars
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.01,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true // Makes stars smaller when further away
});

const starField = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(starField);

// Position camera
camera.position.z = 30;

// Smoother animation
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.0005;

    // Gentle rotating motion
    starField.rotation.y = time * 0.2;
    starField.rotation.x = time * 0.1;

    // Subtle pulsing motion
    starField.position.z = Math.sin(time) * 2;

    renderer.render(scene, camera);
}
animate();

// Improved window resize handler
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener('resize', handleResize);



const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             // Add different animation classes based on section
//             if (entry.target.classList.contains('projects')) {
//                 entry.target.classList.add('animate-projects');
//             } else if (entry.target.classList.contains('split-content')) {
//                 const leftBox = entry.target.querySelector('.content-box.left');
//                 const rightBox = entry.target.querySelector('.content-box.right');
//                 if (leftBox) leftBox.classList.add('animate-left');
//                 if (rightBox) rightBox.classList.add('animate-right');
//             } else if (entry.target.classList.contains('keyboard')) {
//                 entry.target.classList.add('animate-keyboard');
//                 const features = entry.target.querySelectorAll('.feature-box');
//                 features.forEach((box, index) => {
//                     box.style.animationDelay = `${0.2 * (index + 1)}s`;
//                     box.classList.add('animate-feature');
//                 });
//             }
//             // Optionally remove observer after animation
//             observer.unobserve(entry.target);
//         }
//     });
// }, observerOptions);

// // Observe all sections that need animations
// document.querySelectorAll('.projects, .split-content, .keyboard').forEach(section => {
//     observer.observe(section);
// });



// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             if (entry.target.classList.contains('split-content')) {
//                 entry.target.style.opacity = '1'; // Make section visible
//                 const leftBox = entry.target.querySelector('.content-box.left');
//                 const rightBox = entry.target.querySelector('.content-box.right');
//                 if (leftBox) leftBox.classList.add('animate-left');
//                 if (rightBox) rightBox.classList.add('animate-right');
//             } else if (entry.target.classList.contains('keyboard')) {
//                 entry.target.classList.add('animate-keyboard');
//                 const features = entry.target.querySelectorAll('.feature-box');
//                 features.forEach((box, index) => {
//                     setTimeout(() => {
//                         box.classList.add('animate-feature');
//                     }, index * 200); // 200ms delay between each feature
//                 });
//             }
//             observer.unobserve(entry.target);
//         }
//     });
// }, {
//     threshold: 0.2,
//     rootMargin: '0px'
// });

// // Observe the sections
// document.querySelectorAll('.split-content, .keyboard').forEach(section => {
//     observer.observe(section);
// });


// Add this at the end of your script
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Split Content Section Animation
                if (entry.target.classList.contains('split-content')) {
                    entry.target.classList.add('fade-in');
                    const leftBox = entry.target.querySelector('.content-box.left');
                    const rightBox = entry.target.querySelector('.content-box.right');

                    // Add slight delay for content boxes
                    setTimeout(() => {
                        if (leftBox) leftBox.classList.add('slide-from-left');
                        if (rightBox) rightBox.classList.add('slide-from-right');
                    }, 300);
                }

                // Keyboard Section Animation
                if (entry.target.classList.contains('keyboard')) {
                    entry.target.classList.add('fade-in');

                    // Animate feature boxes with delay
                    const features = entry.target.querySelectorAll('.feature-box');
                    features.forEach((box, index) => {
                        setTimeout(() => {
                            box.classList.add('slide-up');
                        }, 300 + (index * 200)); // 200ms delay between each feature
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections that need animations
    const sections = document.querySelectorAll('.split-content, .keyboard');
    sections.forEach(section => {
        observer.observe(section);
    });
});

const menuBtn = document.querySelector('.nav-menu-btn');
const navItems = document.querySelector('.nav-items');

menuBtn.addEventListener('click', () => {
    navItems.classList.toggle('active');
});