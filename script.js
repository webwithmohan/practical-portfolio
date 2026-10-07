/* ==========================================================================
   Mohanraj Portfolio - Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typing / Running Text Effect ---
    const typingTextElement = document.getElementById('typing-text');
    const words = ["Developer and Designer", "Web Developer", "UI/UX Designer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingTextElement) {
        typeEffect();
    }

    // --- 2. Side Scroll Progress Bar & Top Progress Bar ---
    const scrollProgressBar = document.getElementById('scroll-progress');
    const scrollPercentageElement = document.getElementById('scroll-percentage');

    function updateScrollProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (scrollHeight > 0) {
            const scrollPercentage = Math.min(Math.round((scrollTop / scrollHeight) * 100), 100);
            if (scrollProgressBar) {
                scrollProgressBar.style.width = scrollPercentage + '%';
            }
            if (scrollPercentageElement) {
                scrollPercentageElement.textContent = scrollPercentage + '%';
            }
        }
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial check

    // --- 3. Circular Skill Progress Load Animation ---
    const skillCards = document.querySelectorAll('.skill-card');
    let animatedSkills = false;

    function animateSkillCircles() {
        skillCards.forEach(card => {
            const targetPercent = parseInt(card.getAttribute('data-percent'), 10);
            const circleProgress = card.querySelector('.circle-progress');
            const numberDisplay = card.querySelector('.number');

            if (!circleProgress || !numberDisplay) return;

            // Circumference of r=50 circle is ~314.15
            const circumference = 314.15;
            const offset = circumference - (circumference * targetPercent / 100);

            circleProgress.style.strokeDashoffset = offset;

            // Counter animation
            let currentVal = 0;
            const duration = 1500;
            const stepTime = Math.abs(Math.floor(duration / targetPercent));

            const timer = setInterval(() => {
                currentVal++;
                numberDisplay.textContent = currentVal;
                if (currentVal >= targetPercent) {
                    clearInterval(timer);
                }
            }, stepTime);
        });
    }

    // IntersectionObserver for Skills Section Animation Trigger
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observerOptions = {
            root: null,
            threshold: 0.3
        };

        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animatedSkills) {
                    animateSkillCircles();
                    animatedSkills = true; // Run animation once
                }
            });
        }, observerOptions);

        skillsObserver.observe(skillsSection);
    }

    // --- 4. Navigation Link Active State & Sticky Header ---
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScrollNav() {
        // Header shadow & height change
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlighting based on section scroll position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScrollNav);

    // Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');

    if (hamburger && navbar) {
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('open');
            const icon = hamburger.querySelector('i');
            if (navbar.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('open');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- 5. Contact Form Submission Simulation ---
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;

            if (formAlert) {
                formAlert.className = 'form-alert success';
                formAlert.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Your message has been sent successfully.`;
                contactForm.reset();

                setTimeout(() => {
                    formAlert.style.display = 'none';
                }, 5000);
            }
        });
    }
});
