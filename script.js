
/* =========================
   PORTFOLIO NAVIGATION
========================= */

// Get all navigation links and content sections.
const menuLinks = document.querySelectorAll(".menu-link");
const pages = document.querySelectorAll(".page");

// Set the currently selected section.
function showPage(pageId) {

    // Use Home if the requested section doesn't exist.
    const pageExists = document.getElementById(pageId)
        ?.classList.contains("page");

    if (!pageExists) {
        pageId = "home";
    }

    // Show the selected page and hide the others.
    pages.forEach((page) => {
        page.hidden = page.id !== pageId;
    });

    // Highlight the selected navigation item.
    menuLinks.forEach((link) => {

        const isActive = link.hash === `#${pageId}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }

    });

    // Reset the content window's scroll position.
    document.querySelector(".content-window").scrollTop = 0;
}

// Read the selected section from the URL.
function updatePageFromURL() {

    const pageId = window.location.hash.substring(1) || "home";

    showPage(pageId);
}

// Handle navigation and browser Back/Forward.
window.addEventListener("hashchange", updatePageFromURL);

// Set the initial section when the website loads.
updatePageFromURL();
