/* =========================================================
   VERDANT — FARM PRELOADER
   SEQUENCE:
   SEED → SUN → CRACK → ROOTS → PLANT → LEAVES → FADE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const preloader = document.getElementById("farmPreloader");
    const scene = document.getElementById("preloaderScene");

    const sun = document.getElementById("preloaderSun");
    const seedContainer = document.getElementById("seedContainer");
    const roots = document.getElementById("preloaderRoots");
    const plant = document.getElementById("preloaderPlant");
    const particles = document.getElementById("seedParticles");

    const progressBar = document.getElementById("loaderProgressBar");
    const percentage = document.getElementById("loaderPercentage");

    if (!preloader || !scene) return;


    /* =====================================================
       PREVENT PAGE SCROLL
    ===================================================== */

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";


    /* =====================================================
       ELEMENT HELPERS
    ===================================================== */

    function addClass(element, className) {
        if (element) {
            element.classList.add(className);
        }
    }


    function removeClass(element, className) {
        if (element) {
            element.classList.remove(className);
        }
    }


    /* =====================================================
       PROGRESS COUNTER
    ===================================================== */

    let currentProgress = 0;

    function updateProgress(value) {

        currentProgress = Math.min(
            100,
            Math.max(0, value)
        );

        if (progressBar) {
            progressBar.style.width = `${currentProgress}%`;
        }

        if (percentage) {
            percentage.textContent =
                String(Math.round(currentProgress)).padStart(2, "0");
        }
    }


    /* =====================================================
       SMOOTH PROGRESS
    ===================================================== */

    function animateProgress(target, duration) {

        return new Promise((resolve) => {

            const startValue = currentProgress;
            const difference = target - startValue;

            const startTime = performance.now();

            function frame(currentTime) {

                const elapsed = currentTime - startTime;

                const progress = Math.min(
                    elapsed / duration,
                    1
                );

                /*
                   Smooth ease-out
                */
                const eased =
                    1 - Math.pow(1 - progress, 3);

                updateProgress(
                    startValue + difference * eased
                );

                if (progress < 1) {

                    requestAnimationFrame(frame);

                } else {

                    resolve();

                }
            }

            requestAnimationFrame(frame);
        });
    }


    /* =====================================================
       DELAY
    ===================================================== */

    function wait(milliseconds) {

        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateProgress(0);

    removeClass(sun, "is-visible");
    removeClass(seedContainer, "is-cracked");
    removeClass(roots, "is-visible");
    removeClass(plant, "is-visible");
    removeClass(particles, "is-active");
    removeClass(scene, "is-exiting");
    removeClass(scene, "is-hidden");
    removeClass(preloader, "is-hidden");


    /* =====================================================
       MAIN PRELOADER TIMELINE
    ===================================================== */

    async function startPreloader() {


        /* -------------------------------------------------
           STEP 01
           SEED / SOIL APPEARS
        ------------------------------------------------- */

        await wait(350);

        await animateProgress(12, 550);


        /* -------------------------------------------------
           STEP 02
           SUN APPEARS
        ------------------------------------------------- */

        await wait(250);

        addClass(sun, "is-visible");

        await animateProgress(25, 650);


        /* -------------------------------------------------
           STEP 03
           SUN SETTLES
        ------------------------------------------------- */

        await wait(450);

        await animateProgress(34, 450);


        /* -------------------------------------------------
           STEP 04
           SEED CRACKS
        ------------------------------------------------- */

        addClass(seedContainer, "is-cracked");

        await animateProgress(48, 750);


        /* -------------------------------------------------
           STEP 05
           SEED PARTICLES BURST
        ------------------------------------------------- */

        await wait(150);

        addClass(particles, "is-active");

        await animateProgress(55, 400);


        /* -------------------------------------------------
           STEP 06
           ROOTS START GROWING
        ------------------------------------------------- */

        await wait(150);

        addClass(roots, "is-visible");

        await animateProgress(68, 1000);


        /* -------------------------------------------------
           STEP 07
           PLANT STEM GROWS
        ------------------------------------------------- */

        await wait(200);

        addClass(plant, "is-visible");

        await animateProgress(82, 1000);


        /* -------------------------------------------------
           STEP 08
           LEAVES OPEN
        ------------------------------------------------- */

        await wait(700);

        await animateProgress(91, 750);


        /* -------------------------------------------------
           STEP 09
           FULL PLANT MOMENT
        ------------------------------------------------- */

        await wait(500);

        await animateProgress(96, 450);


        /* -------------------------------------------------
           STEP 10
           WORLD ROTATES
        ------------------------------------------------- */

        await wait(400);

        addClass(scene, "is-exiting");

        addClass(
            document.getElementById("seedWorld"),
            "is-rotating"
        );

        await animateProgress(100, 500);


        /* -------------------------------------------------
           STEP 11
           FADE OUT
        ------------------------------------------------- */

        await wait(700);

        addClass(preloader, "is-hidden");


        /* -------------------------------------------------
           STEP 12
           RESTORE WEBSITE SCROLL
        ------------------------------------------------- */

        await wait(1000);

        document.body.style.overflow =
            originalOverflow || "";


        /* -------------------------------------------------
           CLEANUP
        ------------------------------------------------- */

        preloader.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       START
    ===================================================== */

    startPreloader();

});