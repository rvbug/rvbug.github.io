// Mobile menu functionality
const menuBtn = document.querySelector('.nav-menu-btn');
const closeBtn = document.querySelector('.nav-close-btn');
const navItems = document.querySelector('.nav-items');

menuBtn.addEventListener('click', () => {
    navItems.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    navItems.classList.remove('active');
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Modal functionality
const modalData = {
    neovim: {
        title: "Neovim IDE Setup",
        sections: [
            {
                image: "/api/placeholder/600/400",
                text: "Our Neovim IDE setup provides a powerful, customizable development environment that rivals modern IDEs while maintaining the efficiency of a terminal-based workflow. Built with Lua configurations, it includes intelligent code completion, syntax highlighting, and git integration."
            },
            {
                image: "/api/placeholder/600/400",
                text: "The setup includes custom keybindings, snippets, and a carefully curated set of plugins that enhance productivity without sacrificing performance. Perfect for developers who value speed and customization in their daily workflow."
            },
            {
                image: "/api/placeholder/600/400",
                text: "Advanced features include LSP integration, treesitter for better syntax highlighting, telescope for fuzzy finding, and much more. All configurations are modular and well-documented for easy customization."
            }
        ]
    },

    dotfiles: {
        title: "Dotfiles",
        sections: [
            {
                image: "/api/placeholder/600/400",
                text: "Our comprehensive dotfiles framework automates the entire machine configuration process, ensuring a consistent and efficient development environment across different systems. The setup includes carefully curated configurations for terminal, shell, and essential development tools, all managed through a single automated script."
            },
            {
                image: "/api/placeholder/600/400",
                text: "The framework features modular configuration files, powerful shell aliases, and custom functions that streamline common development tasks. Perfect for developers who want to maintain consistent workflows across multiple machines while eliminating manual setup overhead."
            },
            {
                image: "/api/placeholder/600/400",
                text: "Advanced capabilities include package management automation, shell customizations, git configurations, and environment-specific settings. The entire setup is version-controlled and well-documented, making it easy to track changes and share configurations with team members."
            }
        ]
    },

    CookieML: {
        title: "Cookie ML Python",
        sections: [
            {
                image: "/api/placeholder/600/400",
                text: "Cookie-ML provides an intuitive project structure generator that helps data scientists and ML engineers quickly bootstrap machine learning projects following industry best practices. The framework creates a consistent, maintainable project structure that scales from experimentation to production deployment."
            },
            {
                image: "/api/placeholder/600/400",
                text: "The scaffold includes pre-configured directories for data processing, model training, evaluation pipelines, and deployment scripts. Built with simplicity in mind, it helps teams maintain clean code organization while focusing on the core ML development process."
            },
            {
                image: "/api/placeholder/600/400",
                text: "Advanced features include integrated logging setup, configuration management, experiment tracking templates, and modular pipeline structures. The generated project structure supports both quick prototyping and production-grade machine learning workflows, complete with documentation templates and testing frameworks."
            }
        ]
    },

    CookieMLRust: {
        title: "Cookie ML Rust",
        sections: [
            {
                image: "/api/placeholder/600/400",
                text: "Cookie-ML Rust edition leverages Rust's robust type system and memory safety guarantees to generate rock-solid machine learning project structures. The framework provides lightning-fast project initialization with compile-time verification of project configurations, ensuring reliability from development to deployment."
            },
            {
                image: "/api/placeholder/600/400",
                text: "Built with Rust's performance-first approach, the tool offers seamless project templating with zero runtime overhead. It includes carefully designed directory structures, dependency management setups, and build configurations that take full advantage of Rust's ecosystem for machine learning development."
            },
            {
                image: "/api/placeholder/600/400",
                text: "Advanced features include type-safe configuration management, integrated error handling patterns, concurrent data pipeline templates, and automated testing setups. The generated project structure embraces Rust idioms while maintaining familiar ML workflow patterns, making it perfect for teams transitioning from Python to Rust for their ML infrastructure."
            }
        ]
    },

    GameOfLife: {
        title: "Game of Life",
        sections: [
            {
                image: "/api/placeholder/600/400",
                text: "Our Rust implementation of Conway's Game of Life demonstrates elegant cellular automation with blazing-fast performance. Built with Rust's zero-cost abstractions and safe concurrency primitives, this version delivers smooth real-time visualization while handling large-scale grid patterns efficiently."
            },
            {
                image: "/api/placeholder/600/400",
                text: "The project features a clean, modular architecture that separates simulation logic from rendering, utilizing Rust's powerful type system and ownership model. With support for multiple rendering backends and configurable grid sizes, it provides both an educational tool and a performance benchmark."
            },
            {
                image: "/api/placeholder/600/400",
                text: "Advanced features include parallel grid computation using Rayon, efficient state management with custom data structures, and support for various input patterns (including RLE format). The implementation showcases Rust's perfect balance of high-level abstraction and low-level performance optimization, making complex cellular automata accessible and performant."
            }
        ]
    },

    transformers: {
        title: "Transformers",
        sections: [
            {
                image: "/api/placeholder/600/400",
                text: "This carefully curated learning repository provides a structured journey through deep learning fundamentals to advanced transformer architectures. Starting with tensor operations and neural network basics, it builds a solid foundation before diving into sequence models, attention mechanisms, and transformer architectures. Each concept is explained with practical code examples and intuitive visualizations."
            },
            {
                image: "/api/placeholder/600/400",
                text: "The curriculum follows a progressive learning approach, breaking down complex concepts into digestible modules. From understanding basic RNNs and LSTMs to mastering multi-headed attention and positional encodings, learners gain both theoretical knowledge and practical implementation skills. Perfect for practitioners wanting to understand transformers from first principles."
            },
            {
                image: "/api/placeholder/600/400",
                text: "Advanced topics include detailed breakdowns of popular transformer variants, optimization techniques, and real-world applications. The repository features hands-on exercises, annotated implementations, and performance optimization strategies. Supplemented with extensive documentation, reference papers, and practical tips for training and deploying transformer models."
            }
        ]
    },

    //add more project details here
};


function openModal(projectId) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const project = modalData[projectId];

    modalTitle.textContent = project.title;
    modalBody.innerHTML = '';

    project.sections.forEach((section, index) => {
        const sectionElement = document.createElement('div');
        sectionElement.className = 'modal-section';
        sectionElement.innerHTML = `
                   <div class="modal-image">
                       <img src="${section.image}" alt="${project.title} section ${index + 1}">
                   </div>
                   <div class="modal-text">
                       <p>${section.text}</p>
                   </div>
               `;
        modalBody.appendChild(sectionElement);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Initialize intersection observer for modal sections
    const modalSections = document.querySelectorAll('.modal-section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    modalSections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Close modal when clicking outside
document.querySelector('.modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeModal();
    }
});