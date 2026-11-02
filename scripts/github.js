
/* =========================
   GITHUB CONFIGURATION
========================= */





/* =========================
   DOM ELEMENTS
========================= */

const projectList = document.getElementById("project-list");
const projectFilter = document.getElementById("project-filter");

let repositories = [];


/* =========================
   FETCH REPOSITORIES
========================= */

async function loadRepositories() {

    try {

        const url =
            `https://api.github.com/users/${githubConfig.username}/repos` +
            "?per_page=100&sort=updated";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        // Filter unwanted repositories
        repositories = data.filter((repo) => {

            if (githubConfig.hiddenRepositories.includes(repo.name)) {
                return false;
            }

            if (githubConfig.hideForks && repo.fork) {
                return false;
            }

            if (githubConfig.hideArchived && repo.archived) {
                return false;
            }

            return true;
        });

        // Sort featured repositories first
        repositories.sort((a, b) => {

            const aIndex =
                githubConfig.featuredRepositories.indexOf(a.name);

            const bIndex =
                githubConfig.featuredRepositories.indexOf(b.name);

            // Both are featured
            if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex;
            }

            // Only A is featured
            if (aIndex !== -1) {
                return -1;
            }

            // Only B is featured
            if (bIndex !== -1) {
                return 1;
            }

            // Otherwise maintain the original order
            return 0;
        });

        populateLanguageFilter();
        displayRepositories("all");

    } catch (error) {

        console.error("Failed to load repositories:", error);

        projectList.textContent =
            "Unable to load repositories. Please try again later.";
    }
}


/* =========================
   LANGUAGE FILTER
========================= */

function populateLanguageFilter() {

    const languages = [
        ...new Set(
            repositories
                .map((repo) => repo.language)
                .filter(Boolean)
        )
    ].sort();

    // Keep the default "All Languages" option.
    projectFilter.length = 1;

    languages.forEach((language) => {

        const option = document.createElement("option");

        option.value = language;
        option.textContent = language;

        projectFilter.appendChild(option);
    });
}


/* =========================
   DISPLAY REPOSITORIES
========================= */

function displayRepositories(language) {

    projectList.replaceChildren();

    const filtered = repositories.filter((repo) => {
        return language === "all" || repo.language === language;
    });

    if (filtered.length === 0) {
        projectList.textContent = "No projects found.";
        return;
    }

    filtered.forEach((repo) => {

        // Project card
        const card = document.createElement("article");
        card.className = "project-card";

        // Featured status
        const isFeatured =
            githubConfig.featuredRepositories.includes(repo.name);

        if (isFeatured) {
            card.classList.add("featured");
        }

        // Card header
        const header = document.createElement("div");
        header.className = "project-card-header";

        const icon = document.createElement("span");
        icon.className = "project-icon";
        icon.textContent = "◇";

        header.appendChild(icon);

        if (isFeatured) {
            const badge = document.createElement("span");
            badge.className = "featured-badge";
            badge.textContent = "★ Featured";

            header.appendChild(badge);
        }

        // Project name
        const title = document.createElement("h3");

        title.textContent = repo.name
            .replace(/[-_]/g, " ");

        // Project description
        const description = document.createElement("p");
        description.className = "project-description";

        description.textContent =
            repo.description ||
            "Explore this project's source code on GitHub.";

        // Card footer
        const footer = document.createElement("div");
        footer.className = "project-card-footer";

        const languageLabel = document.createElement("span");
        languageLabel.className = "project-language";

        languageLabel.textContent = repo.language || "Other";

        const link = document.createElement("a");
        link.href = repo.html_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "project-link";
        link.textContent = "View GitHub ↗";

        footer.append(languageLabel, link);

        // Assemble card
        card.append(
            header,
            title,
            description,
            footer
        );

        projectList.appendChild(card);
    });
}


/* =========================
   EVENT LISTENERS
========================= */

if (projectList && projectFilter) {

    projectFilter.addEventListener("change", () => {
        displayRepositories(projectFilter.value);
    });

    loadRepositories();
}
