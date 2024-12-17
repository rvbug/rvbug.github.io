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


import * as THREE from 'three';

export function initSpacetimeVisualization() {
    const initScene = () => {
        const canvas = document.getElementById('spacetime-canvas');
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });

        const setSize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        setSize();

        // Create tesseract
        const createTesseract = () => {
            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            const size = 2;

            // Inner cube
            vertices.push(
                -size, -size, -size,
                size, -size, -size,
                size, size, -size,
                -size, size, -size,
                -size, -size, size,
                size, -size, size,
                size, size, size,
                -size, size, size
            );

            // Outer cube (scaled)
            const scale = 1.5;
            vertices.push(
                -size * scale, -size * scale, -size * scale,
                size * scale, -size * scale, -size * scale,
                size * scale, size * scale, -size * scale,
                -size * scale, size * scale, -size * scale,
                -size * scale, -size * scale, size * scale,
                size * scale, -size * scale, size * scale,
                size * scale, size * scale, size * scale,
                -size * scale, size * scale, size * scale
            );

            const indices = [];
            // Inner cube edges
            indices.push(
                0, 1, 1, 2, 2, 3, 3, 0,
                4, 5, 5, 6, 6, 7, 7, 4,
                0, 4, 1, 5, 2, 6, 3, 7
            );

            // Outer cube edges
            indices.push(
                8, 9, 9, 10, 10, 11, 11, 8,
                12, 13, 13, 14, 14, 15, 15, 12,
                8, 12, 9, 13, 10, 14, 11, 15
            );

            // Connections between cubes
            indices.push(
                0, 8, 1, 9, 2, 10, 3, 11,
                4, 12, 5, 13, 6, 14, 7, 15
            );

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geometry.setIndex(indices);

            const material = new THREE.LineBasicMaterial({
                color: 0x4a90e2,
                transparent: true,
                opacity: 0.6
            });

            return new THREE.LineSegments(geometry, material);
        };

        // Create black hole
        const createBlackHole = () => {
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 }
                },
                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float time;
                    varying vec2 vUv;
                    void main() {
                        vec2 center = vec2(0.5, 0.5);
                        float dist = length(vUv - center);
                        float intensity = 1.0 - dist;
                        intensity = pow(intensity, 3.0);
                        vec3 color = vec3(0.29, 0.56, 0.89) * intensity; // #4a90e2
                        color += vec3(0.61, 0.35, 0.71) * sin(time + dist * 10.0); // #9b59b6
                        gl_FragColor = vec4(color, intensity);
                    }
                `,
                transparent: true
            });

            return new THREE.Mesh(geometry, material);
        };

        // Create grid from your existing code
        const createGrid = () => {
            const gridSize = 50;
            const gridDivisions = 30;
            const grid = new THREE.Group();

            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            const colors = [];

            for (let i = 0; i <= gridDivisions; i++) {
                for (let j = 0; j <= gridDivisions; j++) {
                    const x = (i - gridDivisions / 2) * (gridSize / gridDivisions);
                    const z = (j - gridDivisions / 2) * (gridSize / gridDivisions);
                    vertices.push(x, 0, z);

                    const color = new THREE.Color(0x4a90e2);
                    colors.push(color.r, color.g, color.b);
                }
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

            // Create indices for grid lines
            const indices = [];
            for (let i = 0; i <= gridDivisions; i++) {
                for (let j = 0; j < gridDivisions; j++) {
                    const a = i * (gridDivisions + 1) + j;
                    const b = a + 1;
                    indices.push(a, b);
                }
            }
            for (let i = 0; i < gridDivisions; i++) {
                for (let j = 0; j <= gridDivisions; j++) {
                    const a = i * (gridDivisions + 1) + j;
                    const b = a + gridDivisions + 1;
                    indices.push(a, b);
                }
            }

            geometry.setIndex(indices);

            const material = new THREE.LineBasicMaterial({
                vertexColors: true,
                opacity: 0.3,
                transparent: true
            });

            const gridMesh = new THREE.LineSegments(geometry, material);
            grid.add(gridMesh);
            return { grid, geometry };
        };

        // Initialize objects
        const tesseract = createTesseract();
        const blackHole = createBlackHole();
        const { grid, geometry } = createGrid();

        // Position objects
        tesseract.position.set(0, 5, 0);
        blackHole.position.set(0, 2, 0);

        // Add to scene
        scene.add(tesseract);
        scene.add(blackHole);
        scene.add(grid);

        // Camera setup
        camera.position.set(0, 30, 50);
        camera.lookAt(0, 0, 0);

        // Animation
        let time = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.005;

            // Rotate tesseract
            tesseract.rotation.x += 0.001;
            tesseract.rotation.y += 0.002;

            // Update black hole
            blackHole.material.uniforms.time.value = time;

            // Update grid for gravitational well
            const positions = geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const z = positions[i + 2];
                const dist = Math.sqrt(x * x + z * z);
                positions[i + 1] = -10 / (1 + dist * 0.3) * Math.exp(-dist * 0.1);
            }
            geometry.attributes.position.needsUpdate = true;

            grid.rotation.y += 0.001;

            renderer.render(scene, camera);
        };

        window.addEventListener('resize', setSize);
        animate();
        canvas.classList.add('loaded');
    };

    initScene();

    // Keep your existing GSAP animations
    gsap.to('.hero-content', {
        opacity: 1,
        duration: 1.5,
        delay: 0.5
    });
}

// Keep your existing GSAP animations for research cards
gsap.utils.toArray('.research-card').forEach((card, i) => {
    gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2 * i,
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const formulaCards = document.querySelectorAll('.formula-card-vertical');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    formulaCards.forEach(card => {
        observer.observe(card);
    });

    const researchData = {
        Quantum: {
            title: "Quantum Computing Research",
            description: "Exploring quantum algorithms and their applications in solving complex computational problems.",
            keyFocus: [
                "Quantum Algorithms",
                "Quantum Error Correction",
                "Quantum-Classical Integration"
            ]
        },
        Neural: {
            title: "Neural Evolution Research",
            description: "Evolutionary algorithms and neural network architectures that simulate natural selection and adaptation.",
            keyFocus: [
                "Evolutionary Strategies",
                "Genetic Neural Networks",
                "Adaptive Fitness Functions"
            ]
        },
        Systems: {
            title: "Adaptive Systems",
            description: "Developing resilient systems with autonomous optimization and maintenance capabilities.",
            keyFocus: [
                "Predictive Maintenance",
                "Dynamic Allocation",
                "Intelligence Systems"
            ]
        }
    };

    const buttons = document.querySelectorAll('.research-btn');
    const researchTitle = document.querySelector('.research-title');
    const researchDescription = document.querySelector('.research-description');
    const focusList = document.querySelector('.focus-list');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const area = button.dataset.area;
            const data = researchData[area];

            // Update buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update content
            researchTitle.textContent = data.title;
            researchDescription.textContent = data.description;
            focusList.innerHTML = data.keyFocus.map(focus => 
                `<li><i class="fas fa-microscope"></i>${focus}</li>`
            ).join('');

            // Update insights visibility
            document.querySelectorAll('.computational-insights').forEach(insight => {
                insight.classList.add('hidden');
            });
            document.getElementById(`${area.toLowerCase()}-insights`).classList.remove('hidden');

            // Reinitialize counters for the newly visible section
            initializeCounters(document.getElementById(`${area.toLowerCase()}-insights`));
        });
    });

    function initializeCounters(container) {
        const counters = container.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    counter.textContent = Math.round(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    initSpacetimeVisualization();
    initSectionAnimations();
});

function initSectionAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-section');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.collaboration, .blog-section').forEach(section => {
        observer.observe(section);
    });
}