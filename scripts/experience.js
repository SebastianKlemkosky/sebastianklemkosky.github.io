
/* =========================
   EXPERIENCE TIMELINE
========================= */

const timeline = document.getElementById("timeline");
const timelineDetails = document.getElementById("timeline-details");

/* =========================
   DISPLAY MILESTONE DETAILS
========================= */

function showMilestone(milestone) {

    timelineDetails.replaceChildren();

    // Category
    const category = document.createElement("span");
    category.className = "timeline-category";
    category.textContent =
        `${milestone.category} · ${milestone.period || milestone.year}`;

    // Title
    const title = document.createElement("h3");
    title.textContent = milestone.title;

    // Description
    const description = document.createElement("p");
    description.textContent = milestone.description;

    timelineDetails.append(
        category,
        title,
        description
    );

    // Optional project links
    if (milestone.links.length > 0) {

        const links = document.createElement("div");
        links.className = "timeline-links";

        milestone.links.forEach((item) => {

            const link = document.createElement("a");

            link.href = item.url;
            link.textContent = item.label;
            link.className = "action-link";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            links.appendChild(link);
        });

        timelineDetails.appendChild(links);
    }

    // Highlight selected milestone
    document.querySelectorAll(".timeline-item")
        .forEach((button) => {

            const active =
                button.dataset.id === milestone.id;

            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", active);
        });
}

/* =========================
   GENERATE TIMELINE
========================= */

function buildTimeline() {

    experienceData.forEach((milestone) => {

        const button = document.createElement("button");
        button.type = "button";
        button.className = "timeline-item";
        button.dataset.id = milestone.id;

        // Timeline circle
        const dot = document.createElement("span");
        dot.className = "timeline-dot";
        dot.setAttribute("aria-hidden", "true");

        // Year
        const year = document.createElement("span");
        year.className = "timeline-year";
        year.textContent = milestone.year;

        // Event title
        const title = document.createElement("span");
        title.className = "timeline-title";
        title.textContent = milestone.title;

        button.append(dot, year, title);

        button.addEventListener("click", () => {
            showMilestone(milestone);
        });

        timeline.appendChild(button);
    });

    // Select the first milestone by default
    if (experienceData.length > 0) {
        showMilestone(experienceData[0]);
    }
}

/* =========================
   INITIALIZE
========================= */

if (timeline && timelineDetails) {
    buildTimeline();
}
