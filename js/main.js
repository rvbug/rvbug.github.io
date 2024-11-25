
// NOTION PAGE Intersection Observer for feature sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

// Observe all feature containers
document.querySelectorAll('.feature-container').forEach(container => {
  observer.observe(container);
});



// Project section tabs
const sections = document.querySelectorAll('.row');

sections.forEach(section => {
  const tabs = section.querySelectorAll('.tabs li');
  const tabContent = section.querySelectorAll('.tab-content');

  //   // Initially, hide all tab content except the visible one in each section
  tabContent.forEach(content => {
    if (!content.classList.contains('content-visible')) {
      content.style.display = 'none';
    }
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default anchor link behavior

      const targetId = tab.firstElementChild.getAttribute('href').substring(1); // Remove the '#'

      tabContent.forEach(content => {
        content.style.display = 'none';
      });

      const targetContent = section.querySelector(`#${targetId}`);
      if (targetContent) {
        targetContent.style.display = 'block';
      } else {
        console.error(`Tab content with ID "${targetId}" not found in section.`);
      }
    });
  });
});


// Working if there are 3 tabs
// const sections = document.querySelectorAll('.row');
// sections.forEach(section => {
//   const tabs = section.querySelectorAll('.tabs li');
//   const tabContent = section.querySelectorAll('.tab-content');

//   // Initially, hide all tab content except the visible one in each section
//   tabContent.forEach(content => {
//     if (!content.classList.contains('content-visible')) {
//       content.style.display = 'none';
//     }
//   });

//   tabs.forEach(tab => {
//     tab.addEventListener('click', () => {
//       const targetId = tab.firstElementChild.getAttribute('href');

//       tabContent.forEach(content => {
//         content.style.display = 'none';
//       });

//       const targetContent = section.querySelector(targetId);
//       if (targetContent) {
//         targetContent.style.display = 'block';
//       } else {
//         console.error(`Tab content with ID "${targetId}" not found in section.`);
//       }
//     });
//   });
// });


//navigation effect of on scroll

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

//service modal
const serviceModals = document.querySelectorAll(".service-modal");
const learnmoreBtns = document.querySelectorAll(".learn-more-btn");
const modalCloseBtns = document.querySelectorAll(".modal-close-btn");

var modal = function (modalClick) {
  serviceModals[modalClick].classList.add("active");
}

learnmoreBtns.forEach((learnmoreBtn, i) => {
  learnmoreBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloseBtns.forEach((modalCloseBtn) => {
  modalCloseBtn.addEventListener("click", () => {
    serviceModals.forEach((modalView) => {
      modalView.classList.remove("active");
    });
  });
});

//portfolio section
const portfolioModals = document.querySelectorAll(".portfolio-model");
const imgCards = document.querySelectorAll(".img-card");
const portfolioCloseBtns = document.querySelectorAll(".portfolio-close-btn");

var portfolioModal = function (modalClick) {
  portfolioModals[modalClick].classList.add("active");
}

imgCards.forEach((imgCard, i) => {
  imgCard.addEventListener("click", () => {
    portfolioModal(i);
  });
});

portfolioCloseBtns.forEach((portfolioCloseBtn) => {
  portfolioCloseBtn.addEventListener("click", () => {
    portfolioModals.forEach((portfolioModalView) => {
      portfolioModalView.classList.remove("active");
    });
  });
});

//for swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


/* theme switching*/
// const themeBtn = document.querySelector(".theme-btn");
// themeBtn.addEventListener("click", () => {
//   document.body.classList.toggle("dark-theme");
//   themeBtn.classList.toggle("sun");

//   localStorage.setItem("saved-theme", getCurrentTheme());
//   localStorage.setItem("saved-icon", getCurrentIcon());

// });

// const getCurrentTheme = () => document.body.classList.contains("dark-theme") ? "dark" : "light";
// const getCurrentIcon = () => themeBtn.classList.contains("sun") ? "sun" : "moon";

// const savedTheme = localStorage.getItem("saved-theme");
// const savedIcon = localStorage.getItem("saved-icon");

// if (savedTheme) {
//   document.body.classList[savedTheme === "dark" ? "add" : "remove"]("dark-theme");
//   themeBtn.classList[savedIcon === "sun" ? "add" : "removed"]("sun");
// }

/* scroll to top logic */

const scrollTopBtn = document.querySelector(".scrollToTop-btn");

window.addEventListener("scroll", function () {
  scrollTopBtn.classList.toggle("active", window.scrollY > 500);
});

scrollTopBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

//navigation meu items active page scroll
// window.addEventListener("scroll", () => {
//   const sections = document.querySelectorAll("section");
//   const scrollY = window.pageYOffset;

//   sections.forEach(current => {
//     let sectionHeight = current.offsetHeight;
//     let sectionTop = current.offsetTop - 50;
//     let id = current.getAttribute("id");

//     if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
//       document.querySelector(".nav-items a[href*=" + id + "]").classList.add("active");
//     }
//     else {
//       document.querySelector(".nav-items a[href*=" + id + "]").classList.remove("active");
//     }
//   });
// });

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    let sectionHeight = current.offsetHeight;
    let sectionTop = current.offsetTop - 50;
    let id = current.getAttribute("id");

    // Only proceed if we have an id
    if (id) {
      // Safely query the navigation item
      const navItem = document.querySelector(`.nav-items a[href*="${id}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add("active");
        } else {
          navItem.classList.remove("active");
        }
      }
    }
  });
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

/* Scroll reveal for common ones */

ScrollReveal({
  reset: true,
  distance: '60px',
  duration: 2500,
  delay: 100
});

/* target elements and specific options to create reveal animation */
ScrollReveal().reveal('.home .info h2', { delay: 500, origin: 'left' })
ScrollReveal().reveal('.home .info h2, .section-title-01, .section-title-02', { delay: 500, origin: 'left' })
ScrollReveal().reveal('.home .info h3, .home .info .p, .about-info .btn', { delay: 600, origin: 'right' })
ScrollReveal().reveal('.home .info .btn', { delay: 700, origin: 'bottom' })
ScrollReveal().reveal('.media-icons i, .contact-left li', { delay: 500, origin: 'left', interval: 200 })
ScrollReveal().reveal('.home-img, about-img', { delay: 500, origin: 'bottom' })
ScrollReveal().reveal('.about description, .contact-right', { delay: 600, origin: 'right' })
ScrollReveal().reveal('.about .professional-list li', { delay: 500, origin: 'right', interval: 200 })
ScrollReveal().reveal('.skills-description, .services-description, .contact-card, .client-swiper', { delay: 500, origin: 'right' })
ScrollReveal().reveal('.skills-description, .services-description, .contact-card, .client-swiper, .contact-left h2', { delay: 700, origin: 'left' })
ScrollReveal().reveal('.experience-card, .service-card, .education, .portfolio .img-card', { delay: 800, origin: 'bottom', interval: 200 })
ScrollReveal().reveal('.footer .group', { delay: 500, origin: 'top', interval: 200 })
// 


//Three.js Stars Animation
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


