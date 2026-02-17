/* ==========================================================================
   Rangeway — Main JavaScript
   Navigation, smooth scroll, scroll animations
   ========================================================================== */

(function () {
    'use strict';

    // Navigation scroll effect
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    function handleNavScroll() {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // Mobile menu toggle
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Scroll-based animations using Intersection Observer
    var animatedElements = document.querySelectorAll('[data-animate]');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry, index) {
                    if (entry.isIntersecting) {
                        // Stagger animations for siblings
                        var parent = entry.target.parentElement;
                        var siblings = parent.querySelectorAll('[data-animate]');
                        var siblingIndex = Array.from(siblings).indexOf(entry.target);
                        var delay = siblingIndex * 100;

                        setTimeout(function () {
                            entry.target.classList.add('visible');
                        }, delay);

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show all elements immediately
        animatedElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // Contact form handling via Formspree
    // To activate: replace YOUR_FORM_ID in the form action with your Formspree endpoint
    // Sign up free at https://formspree.io and create a form to get your ID
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalText = submitBtn.textContent;
            var formAction = contactForm.getAttribute('action');

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // If Formspree is not configured yet, show a friendly message
            if (formAction.indexOf('YOUR_FORM_ID') !== -1) {
                setTimeout(function () {
                    submitBtn.textContent = 'Thank you! We will be in touch.';
                    submitBtn.style.background = '#4a5d52';
                    submitBtn.style.color = '#ffffff';
                    contactForm.reset();
                    setTimeout(function () {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.color = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 800);
                return;
            }

            // Submit to Formspree
            var formData = new FormData(contactForm);
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(function (response) {
                if (response.ok) {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#4a5d52';
                    submitBtn.style.color = '#ffffff';
                    contactForm.reset();
                } else {
                    submitBtn.textContent = 'Something went wrong. Please try again.';
                    submitBtn.style.background = '#c0392b';
                    submitBtn.style.color = '#ffffff';
                }
                setTimeout(function () {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(function () {
                submitBtn.textContent = 'Network error. Please try again.';
                submitBtn.style.background = '#c0392b';
                submitBtn.style.color = '#ffffff';
                setTimeout(function () {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }
})();
