/* =========================================================
   VERDANT FARM & NURSERY
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const siteHeader = document.getElementById("siteHeader");

    const updateHeader = () => {

        if (!siteHeader) return;

        if (window.scrollY > 60) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const scrollProgress =
        document.getElementById("scrollProgress");

    const updateScrollProgress = () => {

        if (!scrollProgress) return;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (window.scrollY / documentHeight) * 100
                : 0;

        scrollProgress.style.width = `${percentage}%`;
    };

    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });


    /* =====================================================
       MOBILE DRAWER
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileDrawer =
        document.getElementById("mobileDrawer");

    const mobileOverlay =
        document.getElementById("mobileOverlay");

    const drawerClose =
        document.getElementById("drawerClose");

    const drawerLinks =
        document.querySelectorAll(".drawer-nav a");

    const openDrawer = () => {

        if (!mobileDrawer || !mobileOverlay) return;

        mobileDrawer.classList.add("active");
        mobileOverlay.classList.add("active");

        document.body.classList.add("drawer-open");

        mobileDrawer.setAttribute("aria-hidden", "false");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "true");
        }
    };


    const closeDrawer = () => {

        if (!mobileDrawer || !mobileOverlay) return;

        mobileDrawer.classList.remove("active");
        mobileOverlay.classList.remove("active");

        document.body.classList.remove("drawer-open");

        mobileDrawer.setAttribute("aria-hidden", "true");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }
    };


    if (menuToggle) {
        menuToggle.addEventListener("click", openDrawer);
    }

    if (drawerClose) {
        drawerClose.addEventListener("click", closeDrawer);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener("click", closeDrawer);
    }

    drawerLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeDrawer();
        });

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeDrawer();
        }

    });


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            revealObserver.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("show");
        });

    }


    /* =====================================================
       PLANT CATEGORY FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".plant-filter");

    const plantCards =
        document.querySelectorAll(".plant-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;

            filterButtons.forEach(item => {

                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");

            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");


            plantCards.forEach(card => {

                const category =
                    card.dataset.category;

                const shouldShow =
                    filter === "all" ||
                    category === filter;

                if (shouldShow) {

                    card.classList.remove("is-hidden");

                    requestAnimationFrame(() => {

                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";

                    });

                } else {

                    card.style.opacity = "0";
                    card.style.transform = "translateY(15px)";

                    setTimeout(() => {

                        card.classList.add("is-hidden");

                    }, 350);

                }

            });

        });

    });


    /* =====================================================
       TESTIMONIAL SLIDER
    ===================================================== */

    const testimonialSlides =
        document.querySelectorAll(".testimonial-slide");

    const testimonialPrev =
        document.getElementById("testimonialPrev");

    const testimonialNext =
        document.getElementById("testimonialNext");

    const testimonialCurrent =
        document.getElementById("testimonialCurrent");


    let testimonialIndex = 0;
    let testimonialTimer;


    const showTestimonial = index => {

        if (!testimonialSlides.length) return;

        testimonialIndex =
            (index + testimonialSlides.length) %
            testimonialSlides.length;


        testimonialSlides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === testimonialIndex
            );

        });


        if (testimonialCurrent) {

            testimonialCurrent.textContent =
                String(testimonialIndex + 1).padStart(2, "0");

        }

    };


    const nextTestimonial = () => {
        showTestimonial(testimonialIndex + 1);
    };


    const previousTestimonial = () => {
        showTestimonial(testimonialIndex - 1);
    };


    if (testimonialNext) {

        testimonialNext.addEventListener(
            "click",
            () => {

                nextTestimonial();
                restartTestimonialTimer();

            }
        );

    }


    if (testimonialPrev) {

        testimonialPrev.addEventListener(
            "click",
            () => {

                previousTestimonial();
                restartTestimonialTimer();

            }
        );

    }


    const startTestimonialTimer = () => {

        testimonialTimer =
            setInterval(nextTestimonial, 5500);

    };


    const restartTestimonialTimer = () => {

        clearInterval(testimonialTimer);

        startTestimonialTimer();

    };


    if (testimonialSlides.length) {

        showTestimonial(0);
        startTestimonialTimer();

    }


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    const animateCounter = counter => {

        const target =
            Number(counter.dataset.count);

        const duration = 1500;

        const startTime =
            performance.now();


        const updateCounter = currentTime => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const eased =
                1 - Math.pow(1 - progress, 3);

            const value =
                Math.floor(target * eased);

            counter.textContent = value;

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        };


        requestAnimationFrame(updateCounter);
    };


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            const counter =
                                entry.target;

                            animateCounter(counter);

                            counterObserver.unobserve(
                                counter
                            );

                        }

                    });

                },
                {
                    threshold: 0.7
                }
            );


        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(counter => {
            counter.textContent =
                counter.dataset.count;
        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    const updateBackToTop = () => {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    };


    updateBackToTop();

    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       SMOOTH ANCHOR LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerOffset = 90;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroImage =
        document.querySelector(".hero-image");


    if (heroImage && window.innerWidth > 800) {

        window.addEventListener("scroll", () => {

            const scroll =
                window.scrollY;

            if (scroll <= window.innerHeight) {

                heroImage.style.transform =
                    `scale(1.04) translateY(${scroll * 0.08}px)`;

            }

        }, {
            passive: true
        });

    }


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    const magneticElements =
        document.querySelectorAll(
            ".header-cta, .button-primary, .button-dark"
        );


    if (window.innerWidth > 900) {

        magneticElements.forEach(element => {

            element.addEventListener("mousemove", event => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.08}px)`;

            });


            element.addEventListener("mouseleave", () => {

                element.style.transform = "";

            });

        });

    }


    /* =====================================================
       IMAGE ERROR FALLBACK
    ===================================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.style.background =
                "linear-gradient(135deg,#1b3322,#668f61)";

            image.style.objectFit = "cover";

        });

    });

});










/* =========================================================
   VERDANT — LOGIN MODAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loginModal =
        document.getElementById("loginModal");

    const loginModalClose =
        document.getElementById("loginModalClose");

    const headerLoginButton =
        document.getElementById("headerLoginButton");

    const drawerLoginButton =
        document.getElementById("drawerLoginButton");

    const loginTabs =
        document.querySelectorAll("[data-login-tab]");

    const loginForms =
        document.querySelectorAll("[data-login-form]");

    const passwordToggles =
        document.querySelectorAll("[data-password-toggle]");

    const userLoginForm =
        document.getElementById("userLoginForm");

    const adminLoginForm =
        document.getElementById("adminLoginForm");


    /* =====================================================
       CHECK
    ===================================================== */

    if (!loginModal) return;


    /* =====================================================
       OPEN MODAL
    ===================================================== */

    function openLoginModal() {

        loginModal.classList.add("active");

        loginModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

        setTimeout(() => {

            const firstInput =
                loginModal.querySelector(
                    ".login-form.active input"
                );

            if (firstInput) {
                firstInput.focus();
            }

        }, 350);
    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeLoginModal() {

        loginModal.classList.remove("active");

        loginModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    /* =====================================================
       HEADER LOGIN
    ===================================================== */

    if (headerLoginButton) {

        headerLoginButton.addEventListener(
            "click",
            openLoginModal
        );

    }


    /* =====================================================
       MOBILE DRAWER LOGIN
    ===================================================== */

    if (drawerLoginButton) {

        drawerLoginButton.addEventListener(
            "click",
            () => {

                /*
                   Close mobile drawer if available
                */

                const mobileDrawer =
                    document.getElementById("mobileDrawer");

                const mobileOverlay =
                    document.getElementById("mobileOverlay");

                if (mobileDrawer) {
                    mobileDrawer.classList.remove("active");
                    mobileDrawer.classList.remove("open");
                }

                if (mobileOverlay) {
                    mobileOverlay.classList.remove("active");
                    mobileOverlay.classList.remove("open");
                }

                openLoginModal();

            }
        );

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (loginModalClose) {

        loginModalClose.addEventListener(
            "click",
            closeLoginModal
        );

    }


    /* =====================================================
       CLICK OUTSIDE MODAL
    ===================================================== */

    loginModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === loginModal
            ) {
                closeLoginModal();
            }

        }
    );


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                loginModal.classList.contains("active")
            ) {
                closeLoginModal();
            }

        }
    );


    /* =====================================================
       LOGIN TABS
    ===================================================== */

    loginTabs.forEach((tab) => {

        tab.addEventListener(
            "click",
            () => {

                const selectedTab =
                    tab.dataset.loginTab;


                /* Remove active from tabs */

                loginTabs.forEach((item) => {

                    item.classList.remove("active");

                });


                /* Add active to selected tab */

                tab.classList.add("active");


                /* Hide all forms */

                loginForms.forEach((form) => {

                    form.classList.remove("active");

                });


                /* Show selected form */

                const selectedForm =
                    document.querySelector(
                        `[data-login-form="${selectedTab}"]`
                    );


                if (selectedForm) {

                    selectedForm.classList.add("active");

                    const firstInput =
                        selectedForm.querySelector("input");

                    if (firstInput) {

                        setTimeout(() => {
                            firstInput.focus();
                        }, 100);

                    }

                }

            }
        );

    });


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    passwordToggles.forEach((toggle) => {

        toggle.addEventListener(
            "click",
            () => {

                const inputId =
                    toggle.dataset.passwordToggle;

                const passwordInput =
                    document.getElementById(inputId);

                if (!passwordInput) return;


                if (
                    passwordInput.type === "password"
                ) {

                    passwordInput.type = "text";

                    toggle.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    toggle.querySelector("span").textContent =
                        "◉";

                } else {

                    passwordInput.type = "password";

                    toggle.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                    toggle.querySelector("span").textContent =
                        "◉";

                }

            }
        );

    });


    /* =====================================================
       USER LOGIN
       → USER DASHBOARD
    ===================================================== */

    if (userLoginForm) {

        userLoginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const emailInput =
                    document.getElementById("userEmail");

                const passwordInput =
                    document.getElementById("userPassword");


                if (
                    !emailInput ||
                    !passwordInput
                ) {
                    return;
                }


                const email =
                    emailInput.value.trim();

                const password =
                    passwordInput.value.trim();


                if (!email || !password) {
                    return;
                }


                /*
                   USER LOGIN
                   → USER DASHBOARD
                */

                window.location.href =
                    "user-dashboard.html";

            }
        );

    }


    /* =====================================================
       ADMIN LOGIN
       → ADMIN DASHBOARD
    ===================================================== */

    if (adminLoginForm) {

        adminLoginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const emailInput =
                    document.getElementById("adminEmail");

                const passwordInput =
                    document.getElementById("adminPassword");


                if (
                    !emailInput ||
                    !passwordInput
                ) {
                    return;
                }


                const email =
                    emailInput.value.trim();

                const password =
                    passwordInput.value.trim();


                if (!email || !password) {
                    return;
                }


                /*
                   ADMIN LOGIN
                   → ADMIN DASHBOARD
                */

                window.location.href =
                    "admin-dashboard.html";

            }
        );

    }


    /* =====================================================
       PREVENT MODAL SCROLL FROM AFFECTING PAGE
    ===================================================== */

    window.addEventListener(
        "pageshow",
        () => {

            loginModal.setAttribute(
                "aria-hidden",
                "true"
            );

        }
    );

});











/* =========================================================
   VERDANT HERO PLANT ROTATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero-section");

    if (!hero) return;


    const plants = document.querySelectorAll(".hero-plant");

    const controls = document.querySelectorAll(".plant-control");

    const plantNumber =
        document.getElementById("plantNumber");

    const plantCategory =
        document.getElementById("plantCategory");


    const plantData = [

        {
            number: "01",
            category: "TROPICAL"
        },

        {
            number: "02",
            category: "FLOWERING"
        },

        {
            number: "03",
            category: "GARDEN"
        }

    ];


    let currentPlant = 0;

    let autoRotate;


    /* =====================================================
       OPEN GARDEN DOORS
    ====================================================== */

    setTimeout(() => {

        hero.classList.add("is-ready");

    }, 350);


    /* =====================================================
       CHANGE PLANT
    ====================================================== */

    function changePlant(index) {

        if (index < 0) {
            index = plants.length - 1;
        }

        if (index >= plants.length) {
            index = 0;
        }


        currentPlant = index;


        plants.forEach((plant, plantIndex) => {

            plant.classList.toggle(
                "active",
                plantIndex === index
            );

        });


        controls.forEach((control, controlIndex) => {

            control.classList.toggle(
                "active",
                controlIndex === index
            );

        });


        if (plantNumber) {

            plantNumber.textContent =
                plantData[index].number;

        }


        if (plantCategory) {

            plantCategory.textContent =
                plantData[index].category;

        }

    }


    /* =====================================================
       CONTROL BUTTONS
    ====================================================== */

    controls.forEach((control) => {

        control.addEventListener("click", () => {

            const index =
                Number(
                    control.dataset.plantControl
                );

            changePlant(index);

            restartAutoRotate();

        });

    });


    /* =====================================================
       AUTO ROTATION
    ====================================================== */

    function startAutoRotate() {

        autoRotate = setInterval(() => {

            changePlant(currentPlant + 1);

        }, 5000);

    }


    function restartAutoRotate() {

        clearInterval(autoRotate);

        startAutoRotate();

    }


    startAutoRotate();

});














document.addEventListener("DOMContentLoaded", function () {

    const journeySlides =
        document.querySelectorAll(".journey-slide");

    const journeyPrev =
        document.getElementById("journeyPrev");

    const journeyNext =
        document.getElementById("journeyNext");

    const journeyCurrent =
        document.getElementById("journeyCurrent");


    if (!journeySlides.length) {
        return;
    }


    let journeyIndex = 0;
    let journeyTimer;


    function showJourney(index) {

        if (index < 0) {
            index = journeySlides.length - 1;
        }

        if (index >= journeySlides.length) {
            index = 0;
        }


        journeyIndex = index;


        journeySlides.forEach(
            (slide, slideIndex) => {

                slide.classList.toggle(
                    "active",
                    slideIndex === journeyIndex
                );

            }
        );


        if (journeyCurrent) {

            journeyCurrent.textContent =
                String(journeyIndex + 1)
                    .padStart(2, "0");

        }

    }


    function nextJourney() {

        showJourney(
            journeyIndex + 1
        );

    }


    function previousJourney() {

        showJourney(
            journeyIndex - 1
        );

    }


    function startJourney() {

        clearInterval(journeyTimer);

        journeyTimer = setInterval(
            nextJourney,
            5000
        );

    }


    function restartJourney() {

        clearInterval(journeyTimer);

        startJourney();

    }


    if (journeyNext) {

        journeyNext.addEventListener(
            "click",
            function () {

                nextJourney();
                restartJourney();

            }
        );

    }


    if (journeyPrev) {

        journeyPrev.addEventListener(
            "click",
            function () {

                previousJourney();
                restartJourney();

            }
        );

    }


    showJourney(0);

    startJourney();

});







/* =========================================================
   VERDANT — MOBILE DRAWER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const mobileOverlay =
        document.getElementById("mobileOverlay");

    const mobileDrawer =
        document.getElementById("mobileDrawer");

    const drawerClose =
        document.getElementById("drawerClose");

    const drawerLoginButton =
        document.getElementById("drawerLoginButton");


    /* -----------------------------------------------------
       SAFETY CHECK
    ----------------------------------------------------- */

    if (
        !mobileOverlay ||
        !mobileDrawer ||
        !drawerClose
    ) {
        return;
    }


    /* -----------------------------------------------------
       OPEN DRAWER
    ----------------------------------------------------- */

    function openDrawer() {

        mobileDrawer.classList.add("active");

        mobileOverlay.classList.add("active");

        mobileDrawer.setAttribute(
            "aria-hidden",
            "false"
        );

        mobileOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "drawer-open"
        );

        drawerClose.focus();
    }


    /* -----------------------------------------------------
       CLOSE DRAWER
    ----------------------------------------------------- */

    function closeDrawer() {

        mobileDrawer.classList.remove("active");

        mobileOverlay.classList.remove("active");

        mobileDrawer.setAttribute(
            "aria-hidden",
            "true"
        );

        mobileOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "drawer-open"
        );
    }


    /* -----------------------------------------------------
       FIND MOBILE MENU BUTTON
    ----------------------------------------------------- */

    const menuButton =
        document.querySelector(
            "#mobileMenuButton, .mobile-menu-button, .menu-toggle, .hamburger"
        );


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openDrawer
        );

    }


    /* -----------------------------------------------------
       CLOSE BUTTON
    ----------------------------------------------------- */

    drawerClose.addEventListener(
        "click",
        closeDrawer
    );


    /* -----------------------------------------------------
       OVERLAY CLICK
    ----------------------------------------------------- */

    mobileOverlay.addEventListener(
        "click",
        closeDrawer
    );


    /* -----------------------------------------------------
       NAV LINKS
       Close drawer before jumping
    ----------------------------------------------------- */

    const drawerLinks =
        mobileDrawer.querySelectorAll(
            ".drawer-nav a"
        );


    drawerLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeDrawer();

            }
        );

    });


    /* -----------------------------------------------------
       DISCOVER CTA
    ----------------------------------------------------- */

    const drawerCta =
        mobileDrawer.querySelector(
            ".drawer-cta"
        );


    if (drawerCta) {

        drawerCta.addEventListener(
            "click",
            closeDrawer
        );

    }


    /* -----------------------------------------------------
       LOGIN BUTTON
       Login JS will handle modal opening.
       We only close drawer here.
    ----------------------------------------------------- */

    if (drawerLoginButton) {

        drawerLoginButton.addEventListener(
            "click",
            () => {

                closeDrawer();

            }
        );

    }


    /* -----------------------------------------------------
       ESC KEY
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                mobileDrawer.classList.contains("active")
            ) {

                closeDrawer();

            }

        }
    );


    /* -----------------------------------------------------
       RESIZE SAFETY
       Close drawer when returning to desktop
    ----------------------------------------------------- */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 768 &&
                mobileDrawer.classList.contains("active")
            ) {

                closeDrawer();

            }

        }
    );


    /* -----------------------------------------------------
       TOUCH SAFETY
    ----------------------------------------------------- */

    let touchStartX = 0;


    mobileDrawer.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    mobileDrawer.addEventListener(
        "touchend",
        (event) => {

            const touchEndX =
                event.changedTouches[0].screenX;

            const swipeDistance =
                touchEndX - touchStartX;


            /*
               Swipe right → close
            */

            if (
                swipeDistance > 90 &&
                mobileDrawer.classList.contains("active")
            ) {

                closeDrawer();

            }

        },
        { passive: true }
    );

});








































/* =========================================
   VERDANT ABOUT HERO IMAGE SLIDER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const images = document.querySelectorAll(
        ".about-hero-image"
    );

    const buttons = document.querySelectorAll(
        ".about-slide"
    );

    const number = document.getElementById(
        "aboutHeroNumber"
    );

    const counter = document.getElementById(
        "aboutHeroCounter"
    );

    const eyebrow = document.getElementById(
        "aboutHeroEyebrow"
    );

    const title = document.getElementById(
        "aboutHeroTitle"
    );

    const description = document.getElementById(
        "aboutHeroDescription"
    );

    const metaOne = document.getElementById(
        "aboutMetaOne"
    );

    const metaTwo = document.getElementById(
        "aboutMetaTwo"
    );


    /* SLIDE CONTENT */

    const slideContent = [

        {
            eyebrow: "WHERE IT ALL BEGAN",
            title: 'A little seed. <em>A bigger dream.</em>',
            description:
                "What started with a few carefully nurtured plants became a growing dream to bring the beauty of nature into everyday spaces.",
            metaOne: "2016",
            metaTwo: "2,500+"
        },

        {
            eyebrow: "ROOTED IN NATURE",
            title: 'Grown with care. <em>Built to flourish.</em>',
            description:
                "From healthy seedlings to thriving greenery, our nursery brings together thoughtful growing practices and a deep love for the natural world.",
            metaOne: "100+",
            metaTwo: "50+"
        },

        {
            eyebrow: "A GREENER TOMORROW",
            title: 'Growing green. <em>Growing together.</em>',
            description:
                "Our purpose is to help people discover the joy of growing plants and create greener spaces for generations to come.",
            metaOne: "100%",
            metaTwo: "∞"
        }

    ];


    let currentIndex = 0;
    let sliderInterval;


    /* CHANGE SLIDE */

    function showSlide(index) {

        if (index < 0 || index >= images.length) {
            return;
        }

        currentIndex = index;


        /* CHANGE IMAGE */

        images.forEach(function (image, i) {

            image.classList.toggle(
                "active",
                i === index
            );

        });


        /* CHANGE BUTTON */

        buttons.forEach(function (button, i) {

            button.classList.toggle(
                "active",
                i === index
            );

            button.setAttribute(
                "aria-pressed",
                i === index ? "true" : "false"
            );

        });


        /* CHANGE IMAGE NUMBER */

        if (number) {
            number.textContent =
                String(index + 1).padStart(2, "0");
        }


        /* CHANGE BOTTOM COUNTER */

        if (counter) {
            counter.textContent =
                `${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
        }


        /* CHANGE CONTENT */

        const content = slideContent[index];

        if (content) {

            if (eyebrow) {
                eyebrow.textContent = content.eyebrow;
            }

            if (title) {
                title.innerHTML = content.title;
            }

            if (description) {
                description.textContent = content.description;
            }

            if (metaOne) {
                metaOne.textContent = content.metaOne;
            }

            if (metaTwo) {
                metaTwo.textContent = content.metaTwo;
            }

        }

    }


    /* BUTTON CLICK EVENTS */

    buttons.forEach(function (button, index) {

        button.addEventListener("click", function () {

            showSlide(index);

            restartSlider();

        });

    });


    /* AUTO SLIDER */

    function startSlider() {

        sliderInterval = setInterval(function () {

            const nextIndex =
                (currentIndex + 1) % images.length;

            showSlide(nextIndex);

        }, 5000);

    }


    /* RESTART SLIDER */

    function restartSlider() {

        clearInterval(sliderInterval);

        startSlider();

    }


    /* INITIALIZE */

    if (images.length > 0 && buttons.length === images.length) {

        showSlide(0);

        startSlider();

    } else {

        console.warn(
            "About slider: Check that the 3 image elements and 3 buttons exist."
        );

    }

});