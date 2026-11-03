
/* =========================
   SKILLS INTERFACE
========================= */

const skillsMenu = document.getElementById("skills-menu");
const skillsDetails = document.getElementById("skills-details");

/* =========================
   DISPLAY SELECTED SKILLS
========================= */

function showSkills(category) {

    // Clear the current details.
    skillsDetails.replaceChildren();

    // Create the category heading.
    const heading = document.createElement("h3");
    heading.textContent = category.title;

    // Create the skills list.
    const list = document.createElement("ul");
    list.className = "skills-list";

    // Generate each skill.
    category.skills.forEach((skill) => {

        const item = document.createElement("li");
        item.className = "skill-tag";
        item.textContent = skill;

        list.appendChild(item);
    });

    // Display the selected category.
    skillsDetails.append(heading, list);

    // Highlight the active category.
    skillsMenu.querySelectorAll(".skill-category")
        .forEach((button) => {

            const active =
                button.dataset.category === category.id;

            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
}

/* =========================
   GENERATE CATEGORY BUTTONS
========================= */

function buildSkillsMenu() {

    skillsData.forEach((category) => {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "skill-category";
        button.dataset.category = category.id;
        button.textContent = category.title;

        // Display skills when a category is clicked.
        button.addEventListener("click", () => {
            showSkills(category);
        });

        skillsMenu.appendChild(button);
    });

    // Select the first category by default.
    if (skillsData.length > 0) {
        showSkills(skillsData[0]);
    }
}

/* =========================
   INITIALIZE
========================= */

if (skillsMenu && skillsDetails) {
    buildSkillsMenu();
}
