/* =========================================================
   PARTH SHAH — PORTFOLIO
   script.js
========================================================= */


/* =========================================================
   01. REGISTER GSAP
========================================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   02. BASIC ELEMENTS
========================================================= */

const body = document.body;

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");

const projectsGrid = document.getElementById("projectsGrid");

const projectsEmpty = document.getElementById("projectsEmpty");

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");


/* =========================================================
   03. CURRENT YEAR
========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   04. PAGE LOADER
========================================================= */

const pageLoader = document.getElementById("pageLoader");

const loaderNumber = document.querySelector(".loader-number");

const loaderProgress = document.querySelector(".loader-progress");


function runLoader() {

    if (!pageLoader) {
        runIntroAnimation();
        return;
    }


    let progress = 0;


    const counter = setInterval(() => {

        /*
            Random increment makes the loader feel
            slightly less mechanical.
        */

        progress += Math.floor(Math.random() * 8) + 3;


        if (progress >= 100) {

            progress = 100;

            clearInterval(counter);


            setTimeout(() => {

                closeLoader();

            }, 250);

        }


        if (loaderNumber) {

            loaderNumber.textContent =
                String(progress).padStart(2, "0");

        }


        if (loaderProgress) {

            gsap.to(loaderProgress, {
                width: `${progress}%`,
                duration: 0.35,
                ease: "power2.out"
            });

        }

    }, 70);

}


function closeLoader() {

    const timeline = gsap.timeline({

        onComplete: () => {

            if (pageLoader) {
                pageLoader.style.display = "none";
            }

            runIntroAnimation();

        }

    });


    timeline

        .to(".loader-center", {
            y: -30,
            opacity: 0,
            duration: 0.45,
            ease: "power3.in"
        })

        .to(".loader-brand", {
            opacity: 0,
            duration: 0.3
        }, "<")

        .to(".loader-track", {
            opacity: 0,
            duration: 0.3
        }, "<")

        .to(pageLoader, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut"
        });

}


/* =========================================================
   05. HERO INTRO
========================================================= */

function runIntroAnimation() {

    const timeline = gsap.timeline();


    timeline

        .from(".header", {
            y: -80,
            opacity: 0,
            duration: 0.9,
            ease: "power4.out"
        })

        .from(".hero-meta", {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.45")

        .from(".hero-kicker", {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, "-=0.4")

        .from(".hero-line-inner", {
            yPercent: 115,
            duration: 1.1,
            stagger: 0.09,
            ease: "power4.out"
        }, "-=0.4")

        .from(".hero-description-wrap", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.55")

        .from(".hero-actions", {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.55")

        .from(".portrait-frame", {
            clipPath:
                "polygon(0 100%, 94% 100%, 100% 100%, 7% 100%)",
            scale: 0.94,
            duration: 1.2,
            ease: "power4.out"
        }, "-=1.15")

        .from(".portrait-image", {
            scale: 1.2,
            duration: 1.4,
            ease: "power4.out"
        }, "<")

        .from(".portrait-index", {
            opacity: 0,
            y: 15,
            duration: 0.6
        }, "-=0.6")

        .from(".floating-card-code", {
            x: -35,
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "back.out(1.4)"
        }, "-=0.45")

        .from(".hero-tech-badge", {
            scale: 0,
            rotate: -90,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.6")

        .from(".hero-bottom", {
            opacity: 0,
            y: 15,
            duration: 0.6
        }, "-=0.4");

}


/* =========================================================
   06. HEADER ON SCROLL
========================================================= */

let previousScroll = window.scrollY;


window.addEventListener("scroll", () => {

    const currentScroll = window.scrollY;


    if (currentScroll > 40) {

        header?.classList.add("scrolled");

    } else {

        header?.classList.remove("scrolled");

    }


    /*
        Hide header when scrolling down.

        Show it when scrolling upward.
    */

    if (currentScroll > previousScroll && currentScroll > 500) {

        gsap.to(header, {
            yPercent: -110,
            duration: 0.4,
            ease: "power3.out"
        });

    } else {

        gsap.to(header, {
            yPercent: 0,
            duration: 0.4,
            ease: "power3.out"
        });

    }


    previousScroll = currentScroll;

});


/* =========================================================
   07. MOBILE MENU
========================================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");

        navMenu.classList.toggle("active");

        body.classList.toggle("menu-open");

    });

}


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuToggle?.classList.remove("active");

        navMenu?.classList.remove("active");

        body.classList.remove("menu-open");

    });

});


/* =========================================================
   08. ACTIVE NAVIGATION
========================================================= */

const navigationSections =
    document.querySelectorAll("section[id]");


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + window.innerHeight * 0.35;


    navigationSections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");


                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   09. CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorCircle =
    document.querySelector(".cursor-circle");

const cursorText =
    document.querySelector(".cursor-text");


if (
    cursor &&
    window.matchMedia("(pointer: fine)").matches
) {

    let mouseX = 0;
    let mouseY = 0;

    let circleX = 0;
    let circleY = 0;


    window.addEventListener("mousemove", event => {

        mouseX = event.clientX;
        mouseY = event.clientY;


        gsap.set(cursorDot, {
            x: mouseX,
            y: mouseY
        });

    });


    /*
        Circle follows slightly behind the mouse.
    */

    function animateCursor() {

        circleX += (mouseX - circleX) * 0.13;

        circleY += (mouseY - circleY) * 0.13;


        gsap.set(cursorCircle, {
            x: circleX,
            y: circleY
        });


        requestAnimationFrame(animateCursor);

    }


    animateCursor();


    function initializeCursorTargets() {

        const cursorTargets =
            document.querySelectorAll("[data-cursor]");


        cursorTargets.forEach(element => {

            /*
                Prevent adding the same listener again
                after Supabase projects are loaded.
            */

            if (element.dataset.cursorReady) {
                return;
            }


            element.dataset.cursorReady = "true";


            element.addEventListener(
                "mouseenter",
                () => {

                    const text =
                        element.dataset.cursor || "VIEW";


                    cursor.classList.add(
                        "cursor-active"
                    );


                    if (cursorText) {
                        cursorText.textContent = text;
                    }

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.classList.remove(
                        "cursor-active"
                    );


                    if (cursorText) {
                        cursorText.textContent = "";
                    }

                }
            );

        });

    }


    initializeCursorTargets();


    /*
        Make this function available after
        dynamic projects are loaded.
    */

    window.initializeCursorTargets =
        initializeCursorTargets;

}


/* =========================================================
   10. MAGNETIC BUTTONS
========================================================= */

function initializeMagneticElements() {

    if (
        !window.matchMedia("(pointer: fine)").matches
    ) {
        return;
    }


    const magneticElements =
        document.querySelectorAll(".magnetic");


    magneticElements.forEach(element => {

        if (element.dataset.magneticReady) {
            return;
        }


        element.dataset.magneticReady = "true";


        element.addEventListener(
            "mousemove",
            event => {

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


                gsap.to(element, {

                    x: x * 0.18,
                    y: y * 0.18,

                    duration: 0.35,

                    ease: "power2.out"

                });

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                gsap.to(element, {

                    x: 0,
                    y: 0,

                    duration: 0.7,

                    ease: "elastic.out(1, 0.35)"

                });

            }
        );

    });

}


initializeMagneticElements();


/* =========================================================
   11. HERO MOUSE PARALLAX
========================================================= */

const hero = document.querySelector(".hero");


if (
    hero &&
    window.matchMedia("(pointer: fine)").matches
) {

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const mouseX =
                (event.clientX - rect.left) /
                rect.width - 0.5;


            const mouseY =
                (event.clientY - rect.top) /
                rect.height - 0.5;


            gsap.to(".portrait-wrap", {

                x: mouseX * 14,
                y: mouseY * 10,

                duration: 1.2,

                ease: "power3.out"

            });


            gsap.to(".floating-card-code", {

                x: mouseX * -22,
                y: mouseY * -18,

                duration: 1.4,

                ease: "power3.out"

            });


            gsap.to(".hero-tech-badge", {

                x: mouseX * 22,
                y: mouseY * 18,

                duration: 1.5,

                ease: "power3.out"

            });

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            gsap.to(
                [
                    ".portrait-wrap",
                    ".floating-card-code",
                    ".hero-tech-badge"
                ],
                {
                    x: 0,
                    y: 0,

                    duration: 1.2,

                    ease: "power3.out"
                }
            );

        }
    );

}


/* =========================================================
   12. HERO SCROLL EFFECTS
========================================================= */

gsap.to(".hero-background-word", {

    xPercent: -8,

    scrollTrigger: {

        trigger: ".hero",

        start: "top top",

        end: "bottom top",

        scrub: 1

    }

});


gsap.to(".hero-content", {

    y: 100,

    opacity: 0.25,

    scrollTrigger: {

        trigger: ".hero",

        start: "top top",

        end: "bottom top",

        scrub: 1

    }

});


gsap.to(".portrait-wrap", {

    yPercent: 15,

    scrollTrigger: {

        trigger: ".hero",

        start: "top top",

        end: "bottom top",

        scrub: 1.2

    }

});


/* =========================================================
   13. GENERAL SECTION REVEALS
========================================================= */

gsap.utils
    .toArray(".section-header")
    .forEach(headerElement => {

        gsap.from(headerElement, {

            y: 35,

            opacity: 0,

            duration: 0.9,

            ease: "power3.out",

            scrollTrigger: {

                trigger: headerElement,

                start: "top 85%"

            }

        });

    });


/* =========================================================
   14. ABOUT ANIMATIONS
========================================================= */

gsap.from(".about-heading h2", {

    y: 90,

    opacity: 0,

    duration: 1,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".about-grid",

        start: "top 78%"

    }

});


gsap.from(".about-content > *", {

    y: 35,

    opacity: 0,

    duration: 0.8,

    stagger: 0.12,

    ease: "power3.out",

    scrollTrigger: {

        trigger: ".about-content",

        start: "top 80%"

    }

});


gsap.from(".about-box", {

    y: 70,

    opacity: 0,

    duration: 0.8,

    stagger: 0.1,

    ease: "power3.out",

    scrollTrigger: {

        trigger: ".about-bento",

        start: "top 85%"

    }

});


/* =========================================================
   15. ABOUT BOX PARALLAX
========================================================= */

if (window.innerWidth > 768) {

    gsap.utils
        .toArray(".about-box")
        .forEach((box, index) => {

            gsap.to(box, {

                y:
                    index % 2 === 0
                        ? -25
                        : 25,

                scrollTrigger: {

                    trigger: ".about-bento",

                    start: "top bottom",

                    end: "bottom top",

                    scrub: 1.2

                }

            });

        });

}


/* =========================================================
   16. SERVICES HEADING
========================================================= */

gsap.from(".services-heading h2", {

    y: 90,

    opacity: 0,

    duration: 1,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".services-heading",

        start: "top 82%"

    }

});


/* =========================================================
   17. SERVICE ROW REVEALS
========================================================= */

gsap.utils
    .toArray(".service-row")
    .forEach(row => {

        gsap.from(row, {

            y: 45,

            opacity: 0,

            duration: 0.8,

            ease: "power3.out",

            scrollTrigger: {

                trigger: row,

                start: "top 88%"

            }

        });

    });


/* =========================================================
   18. SERVICE FOLLOW PREVIEW
========================================================= */

const serviceRows =
    document.querySelectorAll(".service-row");

const servicePreview =
    document.querySelector(".service-preview");


if (
    servicePreview &&
    window.matchMedia("(pointer: fine)").matches
) {

    const previewNumber =
        servicePreview.querySelector("span");

    const previewIcon =
        servicePreview.querySelector("i");


    serviceRows.forEach(row => {

        row.addEventListener(
            "mouseenter",
            () => {

                const serviceNumber =
                    row.dataset.service;


                if (previewNumber) {
                    previewNumber.textContent =
                        serviceNumber;
                }


                /*
                    Change preview icon depending
                    on the service.
                */

                const icons = {

                    "01": "fa-building",

                    "02": "fa-bullseye",

                    "03": "fa-code",

                    "04": "fa-rotate"

                };


                if (previewIcon) {

                    previewIcon.className =
                        `fa-solid ${
                            icons[serviceNumber]
                        }`;

                }


                gsap.to(servicePreview, {

                    opacity: 1,

                    scale: 1,

                    rotate: 4,

                    duration: 0.45,

                    ease: "power3.out"

                });

            }
        );


        row.addEventListener(
            "mousemove",
            event => {

                gsap.to(servicePreview, {

                    x: event.clientX + 110,

                    y: event.clientY,

                    duration: 0.6,

                    ease: "power3.out"

                });

            }
        );


        row.addEventListener(
            "mouseleave",
            () => {

                gsap.to(servicePreview, {

                    opacity: 0,

                    scale: 0.8,

                    rotate: -5,

                    duration: 0.35,

                    ease: "power3.out"

                });

            }
        );

    });

}


/* =========================================================
   19. WORK TITLE
========================================================= */

gsap.from(".work-heading h2", {

    y: 100,

    opacity: 0,

    duration: 1,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".work-heading",

        start: "top 82%"

    }

});


/* =========================================================
   20. PROJECT IMAGE PARALLAX
========================================================= */

function initializeProjectImageEffects() {

    gsap.utils
        .toArray(
            ".browser-preview img, .dynamic-project-media img"
        )
        .forEach(image => {

            if (image.dataset.parallaxReady) {
                return;
            }


            image.dataset.parallaxReady = "true";


            gsap.fromTo(
                image,
                {
                    scale: 1.08
                },
                {
                    scale: 1,

                    ease: "none",

                    scrollTrigger: {

                        trigger:
                            image.closest(
                                ".project-slide, .dynamic-project-card"
                            ),

                        start: "top bottom",

                        end: "bottom top",

                        scrub: 1

                    }

                }
            );

        });

}


/* =========================================================
   21. HORIZONTAL PROJECT SCROLL
========================================================= */

let horizontalScrollTrigger = null;


function initializeHorizontalProjects() {

    /*
        Kill old trigger before rebuilding.
    */

    if (horizontalScrollTrigger) {

        horizontalScrollTrigger.kill();

        horizontalScrollTrigger = null;

    }


    const workSection =
        document.querySelector(".work");

    const workHorizontal =
        document.querySelector(".work-horizontal");

    const workTrack =
        document.querySelector(".work-track");


    if (
        !workSection ||
        !workHorizontal ||
        !workTrack
    ) {
        return;
    }


    /*
        Mobile intentionally stays vertical.
    */

    if (window.innerWidth <= 768) {

        gsap.set(workTrack, {
            clearProps: "transform"
        });

        return;
    }


    const getScrollAmount = () => {

        return Math.max(
            0,
            workTrack.scrollWidth -
            window.innerWidth
        );

    };


    const scrollAmount =
        getScrollAmount();


    /*
        If only one project exists and there is
        nothing to scroll horizontally, don't pin.
    */

    if (scrollAmount <= 50) {
        return;
    }


    const tween = gsap.to(workTrack, {

        x: () => -getScrollAmount(),

        ease: "none",

        scrollTrigger: {

            trigger: workHorizontal,

            start: "top top",

            end: () =>
                `+=${getScrollAmount()}`,

            pin: true,

            scrub: 1,

            invalidateOnRefresh: true,

            anticipatePin: 1,

            onUpdate: self => {

                const progressBar =
                    document.querySelector(
                        ".work-progress-track span"
                    );


                if (progressBar) {

                    gsap.set(progressBar, {

                        width:
                            `${10 + self.progress * 90}%`

                    });

                }

            }

        }

    });


    horizontalScrollTrigger =
        tween.scrollTrigger;

}


/* =========================================================
   22. CAPABILITIES
========================================================= */

gsap.from(".capabilities-title", {

    y: 70,

    opacity: 0,

    duration: 1,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".capabilities-grid",

        start: "top 80%"

    }

});


gsap.utils
    .toArray(".capability-row")
    .forEach((row, index) => {

        gsap.from(row, {

            x: 70,

            opacity: 0,

            duration: 0.8,

            delay: index * 0.04,

            ease: "power3.out",

            scrollTrigger: {

                trigger: row,

                start: "top 88%"

            }

        });

    });


gsap.to(".capabilities-background", {

    y: -180,

    scrollTrigger: {

        trigger: ".capabilities",

        start: "top bottom",

        end: "bottom top",

        scrub: 1

    }

});


/* =========================================================
   23. PROCESS
========================================================= */

gsap.from(".process-intro h2", {

    y: 90,

    opacity: 0,

    duration: 1,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".process-intro",

        start: "top 82%"

    }

});


gsap.from(".process-step", {

    y: 60,

    opacity: 0,

    stagger: 0.14,

    duration: 0.8,

    ease: "power3.out",

    scrollTrigger: {

        trigger: ".process-timeline",

        start: "top 80%"

    }

});


gsap.to(".process-progress span", {

    width: "100%",

    ease: "none",

    scrollTrigger: {

        trigger: ".process-timeline",

        start: "top 80%",

        end: "bottom 45%",

        scrub: 1

    }

});


/* =========================================================
   24. STATEMENT SECTION
========================================================= */

gsap.from(".statement-container > *", {

    y: 70,

    opacity: 0,

    stagger: 0.12,

    duration: 1,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".statement",

        start: "top 65%"

    }

});


gsap.to(".statement-word-top", {

    xPercent: 12,

    scrollTrigger: {

        trigger: ".statement",

        start: "top bottom",

        end: "bottom top",

        scrub: 1

    }

});


gsap.to(".statement-word-bottom", {

    xPercent: -12,

    scrollTrigger: {

        trigger: ".statement",

        start: "top bottom",

        end: "bottom top",

        scrub: 1

    }

});


/* =========================================================
   25. CONTACT ANIMATIONS
========================================================= */

gsap.from(".contact-title h2", {

    y: 100,

    opacity: 0,

    duration: 1,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".contact-title",

        start: "top 80%"

    }

});


gsap.from(".contact-information", {

    x: -50,

    opacity: 0,

    duration: 0.9,

    ease: "power3.out",

    scrollTrigger: {

        trigger: ".contact-grid",

        start: "top 80%"

    }

});


gsap.from(".form-field", {

    y: 35,

    opacity: 0,

    stagger: 0.1,

    duration: 0.7,

    ease: "power3.out",

    scrollTrigger: {

        trigger: ".contact-form",

        start: "top 80%"

    }

});


/* =========================================================
   26. FOOTER
========================================================= */

gsap.from(".footer-big-text", {

    y: 120,

    opacity: 0,

    duration: 1.1,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".footer",

        start: "top 85%"

    }

});


/* =========================================================
   27. BACK TO TOP
========================================================= */

backToTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   28. CONTACT FORM
========================================================= */

contactForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const formData =
            new FormData(contactForm);


        const name =
            formData.get("name");

        const email =
            formData.get("email");

        const projectType =
            formData.get("project_type");

        const message =
            formData.get("message");


        /*
            Basic frontend validation.
        */

        if (
            !name ||
            !email ||
            !message
        ) {

            showFormMessage(
                "Please complete the required fields.",
                "error"
            );

            return;

        }


        /*
            IMPORTANT:

            This currently demonstrates the form
            interaction only.

            Later you can connect this section to:

            - Formspree
            - Supabase
            - EmailJS
            - Your own backend
        */


        console.log({
            name,
            email,
            projectType,
            message
        });


        showFormMessage(
            `Thanks ${name}. Your message is ready to send.`,
            "success"
        );


        contactForm.reset();

    }
);


function showFormMessage(
    message,
    type = "success"
) {

    if (!formMessage) {
        return;
    }


    formMessage.textContent = message;


    formMessage.style.color =
        type === "error"
            ? "#ff6b5d"
            : "#8fe388";


    gsap.fromTo(
        formMessage,
        {
            opacity: 0,
            y: 8
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.4
        }
    );

}


/* =========================================================
   29. SUPABASE PROJECTS
========================================================= */

async function loadProjects() {

    if (!projectsGrid) {
        return;
    }


    /*
        supabase-config.js should create a global
        variable called:

        supabaseClient

        Example:

        const supabaseClient =
            supabase.createClient(
                SUPABASE_URL,
                SUPABASE_ANON_KEY
            );
    */


    if (
        typeof supabaseClient === "undefined"
    ) {

        console.warn(
            "Supabase client was not found."
        );


        projectsGrid.innerHTML = "";

        projectsEmpty?.removeAttribute("hidden");


        initializeHorizontalProjects();

        return;

    }


    try {

        const {
            data: projects,
            error
        } = await supabaseClient

            .from("projects")

            .select("*")

            .order("created_at", {
                ascending: false
            });


        if (error) {
            throw error;
        }


        projectsGrid.innerHTML = "";


        if (
            !projects ||
            projects.length === 0
        ) {

            projectsEmpty?.removeAttribute(
                "hidden"
            );


            initializeHorizontalProjects();

            return;

        }


        projectsEmpty?.setAttribute(
            "hidden",
            ""
        );


        projects.forEach(
            (project, index) => {

                const card =
                    createProjectCard(
                        project,
                        index
                    );


                projectsGrid.appendChild(card);

            }
        );


        /*
            Reinitialize effects because the
            project elements now exist.
        */

        initializeProjectImageEffects();

        initializeMagneticElements();


        if (
            window.initializeCursorTargets
        ) {

            window.initializeCursorTargets();

        }


        /*
            Wait for browser layout before
            calculating horizontal width.
        */

        requestAnimationFrame(() => {

            initializeHorizontalProjects();

            ScrollTrigger.refresh();

        });

    } catch (error) {

        console.error(
            "Project loading error:",
            error
        );


        projectsGrid.innerHTML = `

            <div class="projects-loader">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <span>
                    Projects couldn't be loaded.
                </span>

            </div>

        `;


        initializeHorizontalProjects();

    }

}


/* =========================================================
   30. CREATE PROJECT CARD
========================================================= */

function createProjectCard(
    project,
    index
) {

    const article =
        document.createElement("article");


    article.className =
        "dynamic-project-card";


    /*
        Try to support different column names
        you may already have in Supabase.
    */

    const title =
        project.title ||
        project.name ||
        "Untitled Project";


    const description =
        project.description ||
        project.details ||
        "A selected frontend project.";


    const category =
        project.category ||
        project.type ||
        "Web Development";


    const projectUrl =
        project.project_url ||
        project.live_url ||
        project.url ||
        "#";


    const imageUrl =
        project.image_url ||
        project.image ||
        project.thumbnail ||
        "";


    const videoUrl =
        project.video_url ||
        project.video ||
        "";


    const techStack =
        project.tech_stack ||
        project.technologies ||
        project.tech ||
        [];


    const number =
        String(index + 2).padStart(
            2,
            "0"
        );


    let mediaHTML = "";


    if (videoUrl) {

        mediaHTML = `

            <video
                src="${escapeHTML(videoUrl)}"
                autoplay
                muted
                loop
                playsinline
            ></video>

        `;

    } else if (imageUrl) {

        mediaHTML = `

            <img
                src="${escapeHTML(imageUrl)}"
                alt="${escapeHTML(title)}"
                loading="lazy"
            >

        `;

    } else {

        mediaHTML = `

            <div
                style="
                    width:100%;
                    height:100%;
                    display:grid;
                    place-items:center;
                    font-family:var(--font-display);
                    font-size:clamp(40px,7vw,90px);
                    font-weight:700;
                    letter-spacing:-0.07em;
                "
            >
                ${escapeHTML(title)}
            </div>

        `;

    }


    const technologies =
        normalizeTechnologies(techStack);


    const technologyHTML =
        technologies
            .map(
                technology => `

                    <span>
                        ${escapeHTML(technology)}
                    </span>

                `
            )
            .join("");


    article.innerHTML = `

        <div class="dynamic-project-media">

            ${
                projectUrl !== "#"
                    ? `
                        <a
                            href="${escapeHTML(projectUrl)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="OPEN"
                            style="
                                display:block;
                                width:100%;
                                height:100%;
                            "
                        >
                            ${mediaHTML}
                        </a>
                    `
                    : mediaHTML
            }

        </div>


        <div class="dynamic-project-info">


            <span class="dynamic-project-category">

                ${number} / ${escapeHTML(category)}

            </span>


            <h3>

                ${escapeHTML(title)}

            </h3>


            <p>

                ${escapeHTML(description)}

            </p>


            ${
                technologyHTML
                    ? `
                        <div class="project-tech">

                            ${technologyHTML}

                        </div>
                    `
                    : ""
            }


            ${
                projectUrl !== "#"
                    ? `
                        <a
                            href="${escapeHTML(projectUrl)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="project-link magnetic"
                            data-cursor="OPEN"
                        >

                            View project

                            <span>

                                <i
                                    class="fa-solid fa-arrow-up-right-from-square"
                                ></i>

                            </span>

                        </a>
                    `
                    : ""
            }

        </div>

    `;


    return article;

}


/* =========================================================
   31. NORMALIZE TECHNOLOGIES
========================================================= */

function normalizeTechnologies(value) {

    if (!value) {
        return [];
    }


    /*
        Already an array.
    */

    if (Array.isArray(value)) {
        return value;
    }


    /*
        Try JSON array:
        ["HTML","CSS","JS"]
    */

    if (typeof value === "string") {

        try {

            const parsed =
                JSON.parse(value);


            if (Array.isArray(parsed)) {
                return parsed;
            }

        } catch (error) {

            /*
                Normal comma separated string.
            */

        }


        return value

            .split(",")

            .map(item => item.trim())

            .filter(Boolean);

    }


    return [];

}


/* =========================================================
   32. SIMPLE HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }


    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


/* =========================================================
   33. REFRESH ON IMAGE LOAD
========================================================= */

function refreshAfterImagesLoad() {

    const images =
        document.querySelectorAll("img");


    let loadedImages = 0;


    if (!images.length) {
        return;
    }


    images.forEach(image => {

        if (image.complete) {

            loadedImages++;

        } else {

            image.addEventListener(
                "load",
                () => {

                    loadedImages++;


                    if (
                        loadedImages ===
                        images.length
                    ) {

                        ScrollTrigger.refresh();

                    }

                }
            );

        }

    });

}


/* =========================================================
   34. RESIZE HANDLING
========================================================= */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);


        resizeTimer = setTimeout(() => {

            initializeHorizontalProjects();

            ScrollTrigger.refresh();

        }, 250);

    }
);


/* =========================================================
   35. INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        runLoader();

        loadProjects();

        initializeProjectImageEffects();

        refreshAfterImagesLoad();

        updateActiveNavigation();

    }
);


/* =========================================================
   36. FINAL REFRESH
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            initializeHorizontalProjects();

            ScrollTrigger.refresh();

        }, 300);

    }
);