/**
 * FBF Fit Body Factory - Interactive Script
 * Handles mobile navigation, navbar state, counter animations, scroll reveals,
 * preloader, BMI calculator, and photo slider.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Preloader Handler ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                document.body.classList.remove('loading');
            }
        }, 1000); // 1s delay for better UX
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    const closeMenu = () => {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // --- Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false;
    
    const startCounters = () => {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.innerText.includes('+') ? '+' : '';
            const increment = target / 50; // Adjust speed
            
            let current = 0;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.innerText = Math.ceil(current) + (current >= target ? suffix : '');
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target + suffix;
                }
            };
            
            updateCounter();
        });
    };
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    startCounters();
                    started = true;
                }
            });
        }, observerOptions);
        
        statsObserver.observe(statsSection);
    }
    
    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };
    
    // Trigger once on load and on scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    
    // --- Active Link Highlight ---
    const sections = document.querySelectorAll('section, header, footer');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (current && href && href.includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Scroll Progress Bar ---
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";
    });

    // --- Custom Cursor ---
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    const links = document.querySelectorAll('a, button, .faq-question, .program-card, input, select');

    document.addEventListener('mousemove', (e) => {
        if (cursorOuter && cursorInner) {
            cursorOuter.style.left = e.clientX + 'px';
            cursorOuter.style.top = e.clientY + 'px';
            cursorInner.style.left = e.clientX + 'px';
            cursorInner.style.top = e.clientY + 'px';
        }
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        link.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // --- Photo Slider Logic ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    const showSlide = (n) => {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        
        // Auto slide every 5s
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }
});


// --- Lead Form WhatsApp Submission ---
function sendWhatsAppLead(event) {
    event.preventDefault();
    
    const name = document.getElementById('lead-name').value;
    const phone = document.getElementById('lead-phone').value;
    const goal = document.getElementById('lead-goal').value;
    
    const adminPhone = "918090000041"; // Gym Owner/Admin Number
    
    const message = `*FBF GYM - NEW LEAD*%0A%0A` +
                    `*Name:* ${name}%0A` +
                    `*Phone:* ${phone}%0A` +
                    `*Goal:* ${goal}%0A%0A` +
                    `Hi FBF Team, I want to claim my FREE week and start my transformation!`;
                    
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${message}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
}
