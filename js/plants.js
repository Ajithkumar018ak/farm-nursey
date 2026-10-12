/* =========================================================
   VERDANT — PLANTS PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.getElementById("siteHeader");

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    handleHeaderScroll();

    window.addEventListener("scroll", handleHeaderScroll, {
        passive: true
    });


    /* =====================================================
       MOBILE DRAWER
    ===================================================== */

    const menuButton = document.getElementById("menuButton") || document.getElementById("menuToggle");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const drawerClose = document.getElementById("drawerClose");
    const menuToggle = document.getElementById("menuToggle");

    const openDrawer = () => {

        if (!mobileDrawer || !mobileOverlay) return;

        mobileDrawer.classList.add("active");
        mobileOverlay.classList.add("active");

        mobileDrawer.setAttribute("aria-hidden", "false");
        mobileOverlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("drawer-open");
        document.body.style.overflow = "hidden";

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "true");
        }
    };

    const closeDrawer = () => {

        if (!mobileDrawer || !mobileOverlay) return;

        mobileDrawer.classList.remove("active");
        mobileOverlay.classList.remove("active");

        mobileDrawer.setAttribute("aria-hidden", "true");
        mobileOverlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("drawer-open");
        document.body.style.overflow = "";

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }
    };

    if (menuButton) {
        menuButton.addEventListener("click", openDrawer);
    }

    if (drawerClose) {
        drawerClose.addEventListener("click", closeDrawer);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener("click", closeDrawer);
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileDrawer && mobileDrawer.classList.contains("active")) {
            closeDrawer();
        }
    });

    document.querySelectorAll(".drawer-nav a").forEach(link => {

        link.addEventListener("click", () => {
            closeDrawer();
        });

    });


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeDrawer();
        }

    });


    /* =====================================================
       HERO PLANT SLIDER
    ===================================================== */

    const heroPlants = document.querySelectorAll(".hero-plant");
    const heroDots = document.querySelectorAll(".hero-dots span");

    const heroEyebrow = document.getElementById("heroEyebrow");
    const heroTitle = document.getElementById("heroTitle");
    const heroDescription = document.getElementById("heroDescription");

    const heroSideTitle = document.getElementById("heroSideTitle");
    const heroSideText = document.getElementById("heroSideText");

    const previousButton = document.getElementById("heroPlantPrev");
    const nextButton = document.getElementById("heroPlantNext");

    const heroCopy = document.querySelector(".hero-main-copy");


    const plantSlides = [

        {
            eyebrow: "THE INDOOR COLLECTION",

            title: "Bring <em>life</em> home.",

            description:
                "Sculptural greens chosen to bring softness, character and calm into everyday spaces.",

            sideTitle:
                "Calm Indoor Spaces",

            sideText:
                "Bring natural character into bedrooms, living spaces and quiet corners.",

            meta:
                "LOW · MEDIUM LIGHT"
        },

        {
            eyebrow: "THE FLOWERING COLLECTION",

            title: "Let colour <em>bloom.</em>",

            description:
                "Flowering plants selected to add seasonal colour, energy and a beautiful sense of movement.",

            sideTitle:
                "Colourful Corners",

            sideText:
                "Bring life to balconies, windows and bright spaces with beautiful flowering plants.",

            meta:
                "BRIGHT · INDIRECT LIGHT"
        },

        {
            eyebrow: "THE OUTDOOR COLLECTION",

            title: "Grow <em>something</em> bigger.",

            description:
                "Strong, beautiful plants for gardens, patios and open-air spaces that deserve more life.",

            sideTitle:
                "Open Garden Spaces",

            sideText:
                "Create a greener outdoor environment with plants made for sunlight and fresh air.",

            meta:
                "BRIGHT · OUTDOOR LIGHT"
        }

    ];


    let currentSlide = 0;
    let sliderTimer = null;
    let isAnimating = false;


    const updateDots = index => {

        heroDots.forEach((dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === index
            );

        });

    };


    const updateHeroContent = index => {

        const slide = plantSlides[index];

        if (!slide) return;

        if (heroCopy) {
            heroCopy.classList.add("slide-changing");
        }

        setTimeout(() => {

            if (heroEyebrow) {
                heroEyebrow.textContent = slide.eyebrow;
            }

            if (heroTitle) {
                heroTitle.innerHTML = slide.title;
            }

            if (heroDescription) {
                heroDescription.textContent =
                    slide.description;
            }

            if (heroSideTitle) {
                heroSideTitle.textContent =
                    slide.sideTitle;
            }

            if (heroSideText) {
                heroSideText.textContent =
                    slide.sideText;
            }

            const leftMeta =
                document.querySelector(".glass-meta");

            if (leftMeta) {
                leftMeta.textContent =
                    slide.meta;
            }

            if (heroCopy) {
                heroCopy.classList.remove("slide-changing");
            }

        }, 380);
    };


    const showSlide = index => {

        if (!heroPlants.length || isAnimating) return;

        isAnimating = true;

        if (index < 0) {
            index = heroPlants.length - 1;
        }

        if (index >= heroPlants.length) {
            index = 0;
        }

        currentSlide = index;

        heroPlants.forEach((plant, plantIndex) => {

            plant.classList.toggle(
                "active",
                plantIndex === currentSlide
            );

        });

        updateDots(currentSlide);
        updateHeroContent(currentSlide);

        setTimeout(() => {
            isAnimating = false;
        }, 850);
    };


    const nextSlide = () => {
        showSlide(currentSlide + 1);
        restartAutoSlider();
    };


    const previousSlide = () => {
        showSlide(currentSlide - 1);
        restartAutoSlider();
    };


    if (nextButton) {
        nextButton.addEventListener(
            "click",
            nextSlide
        );
    }


    if (previousButton) {
        previousButton.addEventListener(
            "click",
            previousSlide
        );
    }


    heroDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            if (index === currentSlide) return;

            showSlide(index);
            restartAutoSlider();

        });

    });


    /* =====================================================
       AUTO SLIDER
    ===================================================== */

    const startAutoSlider = () => {

        clearInterval(sliderTimer);

        sliderTimer = setInterval(() => {

            if (
                document.visibilityState === "visible" &&
                !isAnimating
            ) {
                showSlide(currentSlide + 1);
            }

        }, 5000);
    };


    const restartAutoSlider = () => {
        startAutoSlider();
    };


    startAutoSlider();


    /* =====================================================
       PAUSE SLIDER WHEN MOUSE IS OVER HERO
    ===================================================== */

    const hero = document.getElementById("plantsHero");

    if (hero) {

        hero.addEventListener("mouseenter", () => {
            clearInterval(sliderTimer);
        });

        hero.addEventListener("mouseleave", () => {
            startAutoSlider();
        });

    }


    /* =====================================================
       KEYBOARD SLIDER CONTROL
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "ArrowRight" &&
            document.activeElement?.tagName !== "INPUT"
        ) {
            nextSlide();
        }

        if (
            event.key === "ArrowLeft" &&
            document.activeElement?.tagName !== "INPUT"
        ) {
            previousSlide();
        }

    });


    /* =====================================================
       TOUCH SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    if (hero) {

        hero.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        hero.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const distance =
                    touchEndX - touchStartX;

                if (Math.abs(distance) < 50) {
                    return;
                }

                if (distance < 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-right"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );


        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       STAGGER REVEAL
    ===================================================== */

    const revealGroups = [

        ".featured-grid .plant-feature-card",

        ".categories-list .category-row",

        ".care-grid .care-card",

        ".experience-side .mini-experience"

    ];


    revealGroups.forEach(selector => {

        document
            .querySelectorAll(selector)
            .forEach((element, index) => {

                element.style.transitionDelay =
                    `${index * 90}ms`;

            });

    });


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    const parallaxImages =
        document.querySelectorAll(
            ".personality-image img, .garden-image img"
        );


    let ticking = false;


    const updateParallax = () => {

        const viewportHeight =
            window.innerHeight;

        parallaxImages.forEach(image => {

            const rect =
                image.parentElement.getBoundingClientRect();

            if (
                rect.bottom < 0 ||
                rect.top > viewportHeight
            ) {
                return;
            }

            const progress =
                (viewportHeight - rect.top) /
                (viewportHeight + rect.height);

            const offset =
                (progress - 0.5) * 18;

            image.style.transform =
                `scale(1.035) translateY(${offset}px)`;

        });

        ticking = false;
    };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;
            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".hero-button, .outline-button, .light-button, .final-primary, .final-secondary"
        );


    magneticButtons.forEach(button => {

        button.addEventListener("mousemove", event => {

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX - rect.left - rect.width / 2;

            const y =
                event.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * .08}px, ${y * .08}px)`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
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

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       INITIAL HERO STATE
    ===================================================== */

    showSlide(0);

});