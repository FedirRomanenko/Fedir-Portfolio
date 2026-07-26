const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navigation a");

function updateActiveMenu() {

    let current = "";

    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {

        if (scrollPosition >= section.offsetTop) {

            current = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveMenu);
window.addEventListener("load", updateActiveMenu);