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