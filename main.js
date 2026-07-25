document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Loading Screen ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);

    // --- 2. Dark/Light Mode Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check Local Storage
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // --- 3. Sticky Navbar & Scroll To Top ---
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        // Sticky Nav
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Scroll To Top Button
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 4. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // --- 5. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 6. Animated Statistics Counters ---
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) counterObserver.observe(statsSection);

    // --- 7. FAQ Accordion ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Close others
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current
            item.classList.toggle('active');
        });
    });

    // --- 8. Contact Form Simple Validation ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic simulation of sending
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'جاري الإرسال...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.innerText = 'تم الإرسال بنجاح!';
                btn.classList.replace('btn-primary', 'btn-success');
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.classList.replace('btn-success', 'btn-primary');
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});
// Translation Dictionary
    const translations = {
        ar: {
            "nav_home": "الرئيسية",
            "nav_services": "خدماتنا",
            "nav_features": "لماذا نحن",
            "nav_gallery": "قبل / بعد",
            "nav_contact": "اتصل بنا",
            "hero_subtitle": "حلول متكاملة لجميع مشاكل الصرف الصحي والنظافة",
            "btn_order": "اطلب خدمة الآن",
            "btn_discover": "اكتشف خدماتنا",
            // You can add more translations here matching your data-i18n tags
        },
        en: {
            "nav_home": "Home",
            "nav_services": "Services",
            "nav_features": "Why Us",
            "nav_gallery": "Before / After",
            "nav_contact": "Contact Us",
            "hero_subtitle": "Comprehensive solutions for all plumbing and sanitation problems",
            "btn_order": "Request Service Now",
            "btn_discover": "Discover Our Services",
            // English translations go here
        }
    };

    const langToggleBtn = document.getElementById('lang-toggle');
    const htmlElementDir = document.documentElement;
    
    // Check local storage for saved language, default to Arabic
    let currentLang = localStorage.getItem('lang') || 'ar';

    function setLanguage(lang) {
        // Update HTML attributes for SEO and alignment
        htmlElementDir.setAttribute('lang', lang);
        htmlElementDir.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // Update button text
        langToggleBtn.innerText = lang === 'ar' ? 'EN' : 'AR';
        
        // Find all elements with data-i18n and replace text
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Check if it's an input placeholder or standard text
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.innerText = translations[lang][key];
                }
            }
        });
        
        // Save preference
        localStorage.setItem('lang', lang);
    }

    // Initialize Language on Load
    setLanguage(currentLang);

    // Toggle Language on Click
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            setLanguage(currentLang);
        });
    }