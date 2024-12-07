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

// ScrollReveal Configuration
const scrollReveal = ScrollReveal({
  distance: '40px', // Slightly reduced distance
  duration: 800, // Slightly shorter duration
  delay: 150, // Reduced delay
  reset: true
});

// Animate Hero Section
scrollReveal.reveal('.hero-content', {
  origin: 'top',
  delay: 300 // Reduced delay
});

// Animate Feature Sections
scrollReveal.reveal('.feature-container', {
  origin: 'bottom',
  interval: 250, // Slightly reduced interval
  beforeReveal: (el) => {
    el.classList.add('visible');
  }
});

// Animate Images with different effects
scrollReveal.reveal('.feature-image img', {
  origin: 'right',
  scale: 0.9 // Slight adjustment to scale
});

// Animate Text Content
scrollReveal.reveal('.feature-text h2, .feature-text p', {
  origin: 'left',
  interval: 150 // Reduced interval
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

