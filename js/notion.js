document.addEventListener('DOMContentLoaded', () => {
    const templatesCarousel = document.querySelector('.templates-carousel');
    const templateModal = document.getElementById('templateModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const templatesSection = document.querySelector('.templates-section');
    // Template data


    const templates = [
        {
            title: 'Beginner',
            mainImage: './assets/Notion-QuickLinks-1.png',
            previewImage: './assets/Notion-QuickLinks-1.png', // Add a separate preview image
            description: 'A Beginner-Friendly Productivity Notion Template: Streamline Your Tasks, Track Habits, and Prioritize Goals with Ease.',
            features: ['- Simple & Intutive', '- Idea Capture Section', '- Priorities Tracker', '- Weekly Task view', '- Weekly & Monthly Calendar view', '- To-List', '- Habit Tracker']
        },
        {
            title: 'Advanced',
            mainImage: './assets/Notion-QuickLinks-1.png',
            previewImage: './assets/rust.png', // Add a separate preview image
            description: 'Managing your life with Notion',
            features: ['Areas', 'Books', 'Project Tracking', 'Journaling']
        },
        {
            title: 'Project Tracker',
            mainImage: './assets/Notion-QuickLinks-1.png',
            previewImage: './assets/rust.png', // Add a separate preview image
            description: 'A comprehensive project and task tracking system',
            features: ['Task lists', 'Progress tracking', 'Time Spent']
        },
        {
            title: 'Habit Tracker',
            mainImage: './assets/Notion-QuickLinks-1.png',
            previewImage: './assets/rust.png', // Add a separate preview image
            description: 'Daily and weekly personal organization',
            features: ['Goal setting', 'Habit tracker', 'Time blocking']
        },
        {
            title: 'Travel & Itenerary',
            mainImage: './assets/Notion-QuickLinks-1.png',
            previewImage: './assets/rust.png', // Add a separate preview image
            description: 'Streamline team communication and workflow',
            features: ['Meeting notes', 'Task assignment', 'Resource sharing']
        },
    ];

    // Updated populateTemplates function to use mainImage
    function populateTemplates() {
        templatesCarousel.innerHTML = templates.map((template, index) => `
        <div class="template-card" style="animation-delay: ${index * 0.2}s">
            <img src="${template.mainImage}" alt="${template.title} Template">
            <h3>${template.title}</h3>
            <div class="template-add">
                <i class="fas fa-plus"></i>
            </div>
        </div>
    `).join('');


        // Add click events to template add buttons
        document.querySelectorAll('.template-card').forEach((card, index) => {
            // Trigger reflow to ensure animation works
            card.offsetWidth;

            const addBtn = card.querySelector('.template-add');
            addBtn.addEventListener('click', () => openTemplateModal(templates[index]));
        });
    }


    /// Persistent Animation Observer
    const templateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset animations each time section comes into view
                document.querySelectorAll('.template-card').forEach((card, index) => {
                    // Remove and re-add the class to restart animation
                    card.classList.remove('animate-templates');

                    // Force reflow
                    void card.offsetWidth;

                    card.style.animationDelay = `${index * 0.2}s`;
                    card.classList.add('animate-templates');
                });
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible
    });


    // Start observing the templates section
    templateObserver.observe(templatesSection);



    // Open template modal - Updated to use previewImage
    function openTemplateModal(template) {
        const modalPreview = templateModal.querySelector('.preview img');
        const modalDetails = templateModal.querySelector('.details p');
        const modalFeatures = templateModal.querySelector('.features ul');

        // Use previewImage instead of mainImage
        modalPreview.src = template.previewImage;
        modalDetails.textContent = template.description;
        modalFeatures.innerHTML = template.features.map(feature => `<li>${feature}</li>`).join('');

        templateModal.style.display = 'flex';
    }

    // Close modal functions
    function closeModal() {
        templateModal.style.display = 'none';
    }

    closeModalBtn.addEventListener('click', closeModal);

    // Close modal on clicking outside
    templateModal.addEventListener('click', (e) => {
        if (e.target === templateModal) {
            closeModal();
        }
    });


    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && templateModal.style.display === 'flex') {
            closeModal();
        }
    });




    // Swipe functionality for carousel
    let isDown = false;
    let startX;
    let scrollLeft;

    templatesCarousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - templatesCarousel.offsetLeft;
        scrollLeft = templatesCarousel.scrollLeft;
    });

    templatesCarousel.addEventListener('mouseleave', () => {
        isDown = false;
    });

    templatesCarousel.addEventListener('mouseup', () => {
        isDown = false;
    });

    templatesCarousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - templatesCarousel.offsetLeft;
        const walk = (x - startX) * 2;
        templatesCarousel.scrollLeft = scrollLeft - walk;
    });

    // Initial setup
    populateTemplates();
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


// contact form
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation flags
    let isValid = true;

    // Name validation
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters long';
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Message validation
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters long';
        isValid = false;
    }

    // If all validations pass
    if (isValid) {
        // Replace with your actual email service/endpoint
        const formData = new FormData(this);
        fetch('https://formspree.io/f/YOUR_FORM_ENDPOINT', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
                this.reset(); // Clear form
            } else {
                alert('There was a problem sending your message. Please try again.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('There was a network error. Please try again.');
        });
    }
});