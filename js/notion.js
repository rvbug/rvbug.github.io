document.addEventListener('DOMContentLoaded', () => {
    const templatesCarousel = document.querySelector('.templates-carousel');
    const templateModal = document.getElementById('templateModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const templatesSection = document.querySelector('.templates-section');

    // Template data
    const templates = [
        {
            title: 'Life OS - Simple Version',
            image: './assets/rust.pn',
            description: 'Managing your life with Notion',
            features: ['Simple & Intutive', 'Easily Manageable', 'Starter Kit']
        },
        {
            title: 'Life OS',
            image: './assets/rust.pn',
            description: 'Managing your life with Notion',
            features: ['Areas', 'Books', 'Project Tracking', 'Journaling']
        },
        {
            title: 'Project & Tasks',
            image: './assets/rust.pn',
            description: 'A comprehensive project and task tracking system',
            features: ['Task lists', 'Progress tracking', 'Time Spent']
        },
        {
            title: 'Personal Planner',
            image: '/api/placeholder/300/200',
            description: 'Daily and weekly personal organization',
            features: ['Goal setting', 'Habit tracker', 'Time blocking']
        },
        {
            title: 'Team Collaboration',
            image: '/api/placeholder/300/200',
            description: 'Streamline team communication and workflow',
            features: ['Meeting notes', 'Task assignment', 'Resource sharing']
        },
        {
            title: 'Content Calendar',
            image: '/api/placeholder/300/200',
            description: 'Plan and track content creation',
            features: ['Editorial calendar', 'Content ideas', 'Publication scheduling']
        },
        {
            title: 'Research Tracker',
            image: '/api/placeholder/300/200',
            description: 'Organize research and academic work',
            features: ['Literature review', 'Citation management', 'Project notes']
        },
        {
            title: 'Project Management',
            image: '/api/placeholder/300/200',
            description: 'Comprehensive project tracking template',
            features: ['Task lists', 'Progress tracking', 'Team collaboration']
        },

    ];

    // Updated populateTemplates function to add staggered animation
    function populateTemplates() {
        templatesCarousel.innerHTML = templates.map((template, index) => `
        <div class="template-card" style="animation-delay: ${index * 0.2}s">
            <img src="${template.image}" alt="${template.title} Template">
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


    // const templateObserver = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             // Add a class to trigger animations
    //             document.querySelectorAll('.template-card').forEach((card, index) => {
    //                 card.style.animationDelay = `${index * 0.2}s`;
    //                 card.classList.add('animate-templates');
    //             });

    //             // Disconnect observer after triggering to prevent repeated animations
    //             templateObserver.unobserve(entry.target);
    //         }
    //     });
    // }, {
    //     threshold: 0.1 // Trigger when 10% of the section is visible
    // });

    // Persistent Animation Observer
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

    function populatePricingSection() {
        const pricingSection = document.querySelector('.pricing-section .pricing-grid');
        pricingSection.innerHTML = templates.map(template => `
            <div class="pricing-card">
                <img src="${template.image}" alt="${template.title} Template">
                <h3>${template.title}</h3>
                <div class="pricing-details">
                    <div class="price-usd">
                        <span class="currency">$</span>
                        <span class="amount">${template.priceUSD}</span>
                    </div>
                    <div class="price-inr">
                        <span class="currency">₹</span>
                        <span class="amount">${template.priceINR}</span>
                    </div>
                </div>
                <button class="buy-template">Buy Now</button>
            </div>
        `).join('');
    }


    // Start observing the templates section
    templateObserver.observe(templatesSection);





    // Open template modal
    function openTemplateModal(template) {
        const modalPreview = templateModal.querySelector('.preview img');
        const modalDetails = templateModal.querySelector('.details p');
        const modalFeatures = templateModal.querySelector('.features ul');

        modalPreview.src = template.image;
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
    populatePricingSection();
});