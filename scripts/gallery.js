
/* =========================
   ABOUT PHOTO GALLERY
========================= */

const galleryTrack = document.getElementById("gallery-track");
const galleryModal = document.getElementById("gallery-modal");
const galleryImage = document.getElementById("gallery-large-image");
const galleryCaption = document.getElementById("gallery-caption");

const galleryPrev = document.getElementById("gallery-prev");
const galleryNext = document.getElementById("gallery-next");
const galleryClose = document.getElementById("gallery-close");

/* =========================
   OPEN PHOTO
========================= */

function openGalleryPhoto(photo) {

    galleryImage.src = photo.image;
    galleryImage.alt = photo.alt;
    galleryCaption.textContent = photo.caption;

    galleryModal.showModal();
}

/* =========================
   BUILD THUMBNAILS
========================= */

function buildGallery() {

    galleryData.forEach((photo) => {

        const button = document.createElement("button");
        button.type = "button";
        button.className = "gallery-thumbnail";
        button.setAttribute("aria-label", `Enlarge: ${photo.alt}`);

        const image = document.createElement("img");
        image.src = photo.image;
        image.alt = photo.alt;
        image.loading = "lazy";

        button.appendChild(image);

        button.addEventListener("click", () => {
            openGalleryPhoto(photo);
        });

        galleryTrack.appendChild(button);
    });
}

/* =========================
   CAROUSEL NAVIGATION
========================= */

function scrollGallery(direction) {

    galleryTrack.scrollBy({
        left: direction * 220,
        behavior: "smooth"
    });
}

/* =========================
   INITIALIZE
========================= */

if (galleryTrack && galleryModal && typeof galleryData !== "undefined") {

    if (galleryData.length > 0) {
        buildGallery();
    }

    galleryPrev.addEventListener("click", () => {
        scrollGallery(-1);
    });

    galleryNext.addEventListener("click", () => {
        scrollGallery(1);
    });

    galleryClose.addEventListener("click", () => {
        galleryModal.close();
    });

    galleryModal.addEventListener("click", (event) => {

        if (event.target === galleryModal) {
            galleryModal.close();
        }
    });
}
