
/* ========================================
   Texas Hill Country Parallax
======================================== */

const surface = document.querySelector(".surface");

const farHills = document.querySelector(".mountains-far");
const nearHills = document.querySelector(".mountains-near");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

// Parallax speed multipliers
const FAR_SPEED = 0.35;
const NEAR_SPEED = 0.15;

let ticking = false;

function updateParallax() {
    if (!surface || !farHills || !nearHills) {
        ticking = false;
        return;
    }

    if (reducedMotion.matches) {
        farHills.style.transform = "";
        nearHills.style.transform = "";
        ticking = false;
        return;
    }

    const rect = surface.getBoundingClientRect();

    // Skip updates when the surface is off-screen
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
        ticking = false;
        return;
    }

    const scrollDistance = Math.max(0, -rect.top);

    // Far hills move more slowly relative to the viewport
    farHills.style.transform =
        `translate3d(0, ${scrollDistance * FAR_SPEED}px, 0)`;

    // Near hills move closer to the normal page speed
    nearHills.style.transform =
        `translate3d(0, ${scrollDistance * NEAR_SPEED}px, 0)`;

    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener(
    "scroll",
    requestParallaxUpdate,
    { passive: true }
);

window.addEventListener(
    "resize",
    requestParallaxUpdate
);

reducedMotion.addEventListener(
    "change",
    requestParallaxUpdate
);

// Set initial position
requestParallaxUpdate();
