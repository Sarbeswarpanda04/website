// written by : Sarbeswar panda

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const icon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {
    const active = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", active);

    icon.className = active
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";
});

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        icon.className = "fa-solid fa-bars";
    });
});



const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealItems.forEach((item) => {
    revealObserver.observe(item);
});






document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const body =
        `Name: ${name}%0A` +
        `Email: ${email}%0A%0A` +
        `${message}`;

    window.location.href =
        `mailto:sarbeswar@sarbeswarpanda.me?subject=${encodeURIComponent(subject)}&body=${body}`;
});





const footerYear = document.getElementById("footerYear");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}



/* =================================
   CERTIFICATE MODAL
================================= */

(() => {
    const modal = document.getElementById("certModal");

    if (!modal) return;

    const modalImg = document.getElementById("certModalImg");
    const modalCaption = document.getElementById("certModalCaption");
    let lastFocused = null;

    const openModal = (src, caption) => {
        modalImg.src = src;
        modalImg.alt = caption || "Certificate";
        modalCaption.textContent = caption || "";

        lastFocused = document.activeElement;

        modal.hidden = false;
        // force reflow so the transition runs
        void modal.offsetWidth;
        modal.classList.add("is-open");

        document.body.style.overflow = "hidden";

        modal.querySelector(".cert-modal__close")?.focus();
    };

    const closeModal = () => {
        modal.classList.remove("is-open");
        document.body.style.overflow = "";

        const onEnd = () => {
            modal.hidden = true;
            modalImg.src = "";
            modal.removeEventListener("transitionend", onEnd);
        };

        modal.addEventListener("transitionend", onEnd);

        lastFocused?.focus?.();
    };

    // Open when a certificate link is clicked
    document.querySelectorAll(".expCard__certificate").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const src = link.getAttribute("href")
                || link.querySelector("img")?.getAttribute("src");

            const caption = link.querySelector("img")?.getAttribute("alt");

            if (src) openModal(src, caption);
        });
    });

    // Close on backdrop / close button
    modal.querySelectorAll("[data-cert-close]").forEach((el) => {
        el.addEventListener("click", closeModal);
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.hidden) closeModal();
    });
})();



/* =================================
   SPLASH SCREEN
================================= */

window.addEventListener("load", () => {

    const splash = document.getElementById("splashScreen");

    if (!splash) return;

    setTimeout(() => {
        splash.classList.add("hide");

        setTimeout(() => {
            splash.remove();
        }, 900);

    }, 2200);

});






document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".projects-track");
    const nextBtn = document.querySelector(".projects-arrow--next");
    const prevBtn = document.querySelector(".projects-arrow--prev");
    const progress = document.querySelector(".projects-progress span");

    if (!track) return;


    /* =========================================
       SCROLL AMOUNT
    ========================================= */

    const getScrollAmount = () => {

        const card = track.querySelector(".project-card");

        if (!card) return 400;

        const gap = parseFloat(
            getComputedStyle(track).gap
        ) || 22;

        return card.offsetWidth + gap;
    };


    /* =========================================
       NEXT
    ========================================= */

    nextBtn?.addEventListener("click", () => {

        track.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
        });

    });


    /* =========================================
       PREVIOUS
    ========================================= */

    prevBtn?.addEventListener("click", () => {

        track.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth"
        });

    });


    /* =========================================
       PROGRESS BAR
    ========================================= */

    const updateProgress = () => {

        const maxScroll =
            track.scrollWidth - track.clientWidth;

        if (maxScroll <= 0) {

            if (progress) {
                progress.style.width = "100%";
            }

            return;
        }


        const percentage =
            (track.scrollLeft / maxScroll) * 75 + 25;


        if (progress) {

            progress.style.width =
                `${Math.min(100, percentage)}%`;

        }

    };


    track.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        updateProgress
    );


    updateProgress();

});












(() => {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const metaTheme = document.querySelector('meta[name="theme-color"]');

    const applyTheme = (theme) => {
        root.setAttribute("data-theme", theme);

        if (toggle) {
            const dark = theme === "dark";
            toggle.setAttribute("aria-pressed", String(dark));
            toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
            toggle.innerHTML = dark
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
        }

        if (metaTheme) {
            metaTheme.setAttribute("content", theme === "dark" ? "#050a14" : "#edf6ff");
        }
    };

    const saved = localStorage.getItem("sarbeswar-theme");
    applyTheme(saved === "dark" ? "dark" : "light");

    toggle?.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        localStorage.setItem("sarbeswar-theme", next);
        applyTheme(next);
    });
})();