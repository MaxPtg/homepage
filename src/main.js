// main.js

const skillLevels = {
    beginner: { color: "#A3E635", label: "Einsteiger" }, // Soft Green
    intermediate: { color: "#60A5FA", label: "Fortgeschritten" }, // Bright Blue
    advanced: { color: "#FB923C", label: "Versiert" }, // Vivid Orange
    expert: { color: "#EF4444", label: "Experte" }, // Deep Red
};

function getProficiencyColor(proficiency) {
    return skillLevels[proficiency]?.color || "#9CA3AF"; // Neutral Gray as default
}

function initializeTechTags() {
    const techTags = document.querySelectorAll(".tech-tag");

    techTags.forEach((tag) => {
        const tech = tag.dataset.tech;
        const icon = tag.dataset.icon;
        const proficiency = tag.dataset.proficiency;

        tag.innerHTML = createTechTagContent(tech, icon);
        tag.className += ` inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2`;
        tag.style.borderColor = getProficiencyColor(proficiency);
    });

    initializeProficiencyTooltip();
}

function initializeProficiencyTooltip() {
    const tooltipContent = document.getElementById("proficiency-tooltip");
    let content = '<div class="text-sm">';

    for (const [level, data] of Object.entries(skillLevels)) {
        content += `
            <div class="flex items-center mb-1">
                <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${data.color};"></div>
                <span>${data.label}</span>
            </div>
        `;
    }

    content += "</div>";
    tooltipContent.innerHTML = content;
}

function createTechTagContent(tech, icon) {
    return `
        <img src="/img/tech/${icon}" class="w-4 h-4 mr-1" />
        ${tech}
    `;
}

$(document).ready(function () {
    let aboutLoaded = false;
    let skillsLoaded = false;
    let projectsLoaded = false;

    // Ensure all content is loaded before initializing tech tags
    function checkAllLoaded() {
        if (aboutLoaded && skillsLoaded && projectsLoaded) {
            initializeTechTags();
        }
    }

    $("#about-content").load("content/about.html", function () {
        aboutLoaded = true;
        checkAllLoaded();
    });

    $("#skills-content").load("content/skills.html", function () {
        skillsLoaded = true;
        checkAllLoaded();
    });

    $("#projects-content").load("content/projects.html", function () {
        projectsLoaded = true;
        checkAllLoaded();
    });

    // Particle.js configuration
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#3498db" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#3498db",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse",
                    parallax: {
                        enable: false,
                        force: 60,
                        smooth: 10,
                    },
                },
                onclick: { enable: true, mode: "push" },
                resize: true,
            },
        },
        retina_detect: true,
    });

    // Typed.js initialization
    const typed = new Typed("#typed-output", {
        strings: [
            "Systemadministrator",
            "Full-Stack Entwickler",
            "Technik Enthusiast",
            "Digitalisierungsspezialist",
            "Open-Source Liebhaber",
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
        loop: true,
    });

    // Make name and typed text unselectable
    $("#hero").css({
        "-webkit-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
    });

    // Scroll event for header and scroll-to-top button
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $("header").addClass("bg-gray-900/75 backdrop-blur-sm");
            $("#scroll-to-top").removeClass("opacity-0").addClass("opacity-100");
        } else {
            $("header").removeClass("bg-gray-900/75 backdrop-blur-sm");
            $("#scroll-to-top").removeClass("opacity-100").addClass("opacity-0");
        }
    });

    // Scroll to top
    $("#scroll-to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 800);
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on("click", function (event) {
        let target = $(this.getAttribute("href"));
        if (target.length) {
            event.preventDefault();
            let offset = target.offset().top - $(window).height() * 0.07;
            $("html, body").stop().animate(
                {
                    scrollTop: offset,
                },
                1000
            );
        }
    });

    // Preserve scroll position on page reload
    window.addEventListener("beforeunload", function () {
        localStorage.setItem("scrollPosition", window.scrollY);
    });
    window.addEventListener("load", function () {
        const scrollPosition = localStorage.getItem("scrollPosition");
        if (scrollPosition !== null) {
            window.scrollTo(0, parseInt(scrollPosition, 10));
            localStorage.removeItem("scrollPosition"); // Optional: Entfernen der gespeicherten Position nach dem Wiederherstellen
        }
    });

    // Function to copy text to clipboard
    function copyTextToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            // console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    // Set current year in footer
    $("#current-year").text(new Date().getFullYear());
});
