document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for Scroll Animation
  const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe templates section
  const templatesSection = document.querySelector('.templates-section');
  observer.observe(templatesSection);

  // Template Cards Modal Functionality
  const templateCards = document.querySelectorAll('.template-add');
  const modal = document.getElementById('templateModal');
  const closeModal = document.querySelector('.close-modal');

  // Open modal when "+" icon is clicked
  templateCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const templateCard = e.currentTarget.closest('.template-card');
      const templateTitle = templateCard.querySelector('h3').textContent;
      const templateImage = templateCard.querySelector('img').src;

      // Populate modal content
      modal.querySelector('.modal-content').innerHTML = `
              <span class="close-modal">&times;</span>
              <div class="modal-header">
                  <h2>${templateTitle} Template</h2>
              </div>
              <div class="modal-body">
                  <div class="modal-section preview">
                      <h3>Preview</h3>
                      <img src="${templateImage}" alt="${templateTitle} Template">
                  </div>
                  <div class="modal-section details">
                      <h3>Details</h3>
                      <p>Comprehensive details about the ${templateTitle} template, including its key features and use cases.</p>
                  </div>
                  <div class="modal-section customize">
                      <h3>Customize</h3>
                      <button class="customize-btn">Start Customizing</button>
                  </div>
              </div>
          `;

      // Re-attach close modal event listener
      modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
      });

      modal.style.display = 'block';
    });
  });

  // Close modal when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });

  // Carousel Swipe Functionality
  const carousel = document.querySelector('.templates-carousel');
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('active');
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('active');
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });
});




//navigation effect of on scroll

// window.addEventListener("scroll", function () {
//   const header = document.querySelector("header");
//   header.classList.toggle("sticky", window.scrollY > 0);
// });

// //service modal
// const serviceModals = document.querySelectorAll(".service-modal");
// const learnmoreBtns = document.querySelectorAll(".learn-more-btn");
// const modalCloseBtns = document.querySelectorAll(".modal-close-btn");

// var modal = function (modalClick) {
//   serviceModals[modalClick].classList.add("active");
// }

// learnmoreBtns.forEach((learnmoreBtn, i) => {
//   learnmoreBtn.addEventListener("click", () => {
//     modal(i);
//   });
// });

// modalCloseBtns.forEach((modalCloseBtn) => {
//   modalCloseBtn.addEventListener("click", () => {
//     serviceModals.forEach((modalView) => {
//       modalView.classList.remove("active");
//     });
//   });
// });

//portfolio section
// const portfolioModals = document.querySelectorAll(".portfolio-model");
// const imgCards = document.querySelectorAll(".img-card");
// const portfolioCloseBtns = document.querySelectorAll(".portfolio-close-btn");

// var portfolioModal = function (modalClick) {
//   portfolioModals[modalClick].classList.add("active");
// }

// imgCards.forEach((imgCard, i) => {
//   imgCard.addEventListener("click", () => {
//     portfolioModal(i);
//   });
// });

// portfolioCloseBtns.forEach((portfolioCloseBtn) => {
//   portfolioCloseBtn.addEventListener("click", () => {
//     portfolioModals.forEach((portfolioModalView) => {
//       portfolioModalView.classList.remove("active");
//     });
//   });
// });

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

// const scrollTopBtn = document.querySelector(".scrollToTop-btn");

// window.addEventListener("scroll", function () {
//   scrollTopBtn.classList.toggle("active", window.scrollY > 500);
// });

// scrollTopBtn.addEventListener("click", () => {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// });

//navigation meu items active page scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    let sectionHeight = current.offsetHeight;
    let sectionTop = current.offsetTop - 50;
    let id = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav-items a[href*=" + id + "]").classList.add("active");
    }
    else {
      document.querySelector(".nav-items a[href*=" + id + "]").classList.remove("active");
    }
  });
});


//responsive navigation menu toggle

// const menuBtn = document.querySelector(".nav-menu-btn");
// const closeBtn = document.querySelector(".nav-close-btn");
// const navigation = document.querySelector(".navigation");
// const navItems = document.querySelectorAll(".nav-items a");


// menuBtn.addEventListener("click", () => {
//   navigation.classList.add("active");
// });

// closeBtn.addEventListener("click", () => {
//   navigation.classList.remove("active");
// });

// navItems.forEach((navItem) => {
//   navItem.addEventListener("click", () => {
//     navigation.classList.remove("active");
//   });
// });

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

