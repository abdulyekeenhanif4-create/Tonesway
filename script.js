/**
 * Tonesway Enterprises - Script.js
 * Functionality: Animations, Sliders, Forms, Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500); // 1.5s delay for premium feel
    });

    // 2. Sticky Header & Active Nav Links
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Active Link on Scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Scroll Top Button visibility
        const scrollTopBtn = document.getElementById('scroll-top');
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // 3. Mobile Menu (Hamburger)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 4. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Animated Counters
    const counters = document.querySelectorAll('.stat-num, .exp-num');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-target'));
                let currentCount = 0;
                const duration = 2000; // 2 seconds
                const increment = countTo / (duration / 16); // 60fps

                const updateCount = () => {
                    currentCount += increment;
                    if (currentCount < countTo) {
                        target.innerText = Math.ceil(currentCount);
                        requestAnimationFrame(updateCount);
                    } else {
                        target.innerText = countTo;
                    }
                };
                updateCount();
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 6. Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    const showSlide = (n) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.style.transform = `translateX(-${n * 100}%)`;
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);

    // 7. FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
            });

            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 8. Form Validation & Handling
    const contactForm = document.getElementById('contact-form');
    const distForm = document.getElementById('distributor-form');

    const handleFormSubmit = (e, formType) => {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;

        // Simple feedback
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert(`Thank you! Your ${formType} inquiry has been sent successfully. Our team will contact you shortly.`);
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 1500);
    };

    if (contactForm) contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contact'));
    if (distForm) distForm.addEventListener('submit', (e) => handleFormSubmit(e, 'partnership'));

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            alert(`Thank you for subscribing with ${input.value}!`);
            newsletterForm.reset();
        });
    }

    // 9. Product Modal Logic
    const modal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.close-modal');
    const viewDetailsBtns = document.querySelectorAll('.product-overlay button, .btn-small');

    const productData = {
        'Adore Vegetable Oil': {
            img: 'https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            desc: 'The choice of master chefs. Perfect for deep frying and gourmet cooking. Adore is known for its high smoke point and ability to maintain the natural flavor of food.',
            sizes: '750ml, 1L, 2.5L, 5L, 10L, 25L Jerrycans',
            nutrition: [
                'Fortified with Vitamin A & E',
                'Zero Trans Fats',
                'Low Saturated Fat content',
                'Omega 3 & 6 fatty acids'
            ],
            packaging: 'BPA-Free premium Pet bottles and industrial grade Jerrycans'
        },
        'Extelle Vegetable Oil': {
            img: 'https://images.unsplash.com/photo-1589227365533-dee630bb59bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            desc: 'Healthy everyday cooking oil. Light, clear, and cholesterol-free. Extelle is designed for the health-conscious family, ensuring every meal is light and nutritious.',
            sizes: '1L, 2L, 5L, 10L, 20L Jerrycans',
            nutrition: [
                '100% Cholesterol Free',
                'Heart Friendly Formula',
                'Rich in natural Antioxidants',
                'Vitamin A Fortified'
            ],
            packaging: 'Eco-friendly recyclable Pet bottles and durable Jerrycans'
        }
    };

    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const title = card.querySelector('h3').innerText;
            const data = productData[title];

            if (data) {
                document.getElementById('modal-title').innerText = title;
                document.getElementById('modal-img').src = data.img;
                document.getElementById('modal-desc').innerText = data.desc;
                document.getElementById('modal-sizes').innerText = data.sizes;
                document.getElementById('modal-packaging').innerText = data.packaging;
                
                const nutritionList = document.getElementById('modal-nutrition');
                nutritionList.innerHTML = '';
                data.nutrition.forEach(item => {
                    const li = document.createElement('li');
                    li.innerText = item;
                    nutritionList.appendChild(li);
                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scroll
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 10. Scroll to Top
    const scrollTopBtn = document.getElementById('scroll-top');
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 10. Smooth Scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
