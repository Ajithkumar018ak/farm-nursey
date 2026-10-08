/* =========================================================
   VERDANT ABOUT PAGE
   3 IMAGE HERO + COMPLETE CONTENT CHANGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HERO ELEMENTS
    ====================================================== */

    const heroImage =
        document.getElementById("aboutHeroImage");

    const heroNumber =
        document.getElementById("aboutHeroNumber");

    const heroEyebrow =
        document.getElementById("aboutHeroEyebrow");

    const heroTitle =
        document.getElementById("aboutHeroTitle");

    const heroDescription =
        document.getElementById("aboutHeroDescription");

    const metaOne =
        document.getElementById("aboutMetaOne");

    const metaTwo =
        document.getElementById("aboutMetaTwo");

    const content =
        document.querySelector(".about-hero-content");

    const imageWrapper =
        document.querySelector(".about-hero-image");


    const controls =
        document.querySelectorAll(
            ".about-slide"
        );


    if (!heroImage || !content) return;


    /* =====================================================
       HERO DATA
    ====================================================== */

    const heroSlides = [

        {
            image:
                "assets/images/about-hero-01.webp",

            number:
                "01",

            eyebrow:
                "WHERE IT ALL BEGAN",

            title:
                "A little seed.<em>A bigger dream.</em>",

            description:
                "What started with a few carefully nurtured plants became a growing dream to bring the beauty of nature into everyday spaces.",

            metaOne:
                "2016",

            metaTwo:
                "2,500+"
        },


        {
            image:
                "assets/images/about-hero-02.webp",

            number:
                "02",

            eyebrow:
                "OUR GROWING WORLD",

            title:
                "Closer to nature.<em>Closer to home.</em>",

            description:
                "From our growing spaces in Chennai, every plant is nurtured with patience, healthy soil and an understanding of its natural rhythm.",

            metaOne:
                "10+",

            metaTwo:
                "PLANT TYPES"
        },


        {
            image:
                "assets/images/about-hero-03.webp",

            number:
                "03",

            eyebrow:
                "WHY WE GROW",

            title:
                "Make room for <em>something alive.</em>",

            description:
                "Our purpose is simple — help more people experience the calm, beauty and joy that plants bring into everyday life.",

            metaOne:
                "1",

            metaTwo:
                "BIG PURPOSE"
        }

    ];


    let currentSlide = 0;

    let autoSlider;


    /* =====================================================
       CHANGE SLIDE
    ====================================================== */

    function changeSlide(index) {

        if (index < 0) {
            index =
                heroSlides.length - 1;
        }


        if (index >= heroSlides.length) {
            index = 0;
        }


        currentSlide = index;

        const slide =
            heroSlides[index];


        /* Fade content */

        content.classList.add(
            "is-changing"
        );

        imageWrapper.classList.add(
            "is-changing"
        );


        setTimeout(() => {


            heroImage.src =
                slide.image;

            heroImage.alt =
                slide.eyebrow;


            heroNumber.textContent =
                slide.number;


            heroEyebrow.textContent =
                slide.eyebrow;


            heroTitle.innerHTML =
                slide.title;


            heroDescription.textContent =
                slide.description;


            metaOne.textContent =
                slide.metaOne;


            metaTwo.textContent =
                slide.metaTwo;


            controls.forEach(
                (control, controlIndex) => {

                    control.classList.toggle(
                        "active",
                        controlIndex === index
                    );

                }
            );


            content.classList.remove(
                "is-changing"
            );

            imageWrapper.classList.remove(
                "is-changing"
            );


        }, 320);

    }


    /* =====================================================
       BUTTON CONTROLS
    ====================================================== */

    controls.forEach((control) => {

        control.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        control.dataset.aboutSlide
                    );


                changeSlide(index);

                restartSlider();

            }
        );

    });


    /* =====================================================
       AUTO SLIDER
    ====================================================== */

    function startSlider() {

        autoSlider =
            setInterval(() => {

                changeSlide(
                    currentSlide + 1
                );

            }, 5500);

    }


    function restartSlider() {

        clearInterval(autoSlider);

        startSlider();

    }


    startSlider();


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-right"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .15
                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }

});




















/* =========================================================
   OUR JOURNEY CAROUSEL
========================================================= */

const journeySlides =
    document.querySelectorAll(".journey-slide");

const journeyPrev =
    document.getElementById("journeyPrev");

const journeyNext =
    document.getElementById("journeyNext");

const journeyCurrent =
    document.getElementById("journeyCurrent");


let journeyIndex = 0;
let journeyTimer;


function showJourney(index) {

    if (!journeySlides.length) return;


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
            String(journeyIndex + 1).padStart(2, "0");

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


if (journeyNext) {

    journeyNext.addEventListener(
        "click",
        () => {

            nextJourney();

            restartJourney();

        }
    );

}


if (journeyPrev) {

    journeyPrev.addEventListener(
        "click",
        () => {

            previousJourney();

            restartJourney();

        }
    );

}


function startJourney() {

    journeyTimer =
        setInterval(
            nextJourney,
            5000
        );

}


function restartJourney() {

    clearInterval(
        journeyTimer
    );

    startJourney();

}


if (journeySlides.length) {

    showJourney(0);

    startJourney();

}