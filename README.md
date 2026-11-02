# Retro Sci-Fi Portfolio

My personal software engineering portfolio, built with HTML, CSS, and vanilla JavaScript and inspired by the visual style of early-2000s sci-fi video games, particularly Halo: Combat Evolved.

The website features a retro sci-fi menu interface with an animated background, allowing visitors to navigate between sections without reloading the page.

## Features

- **Menu-Based Navigation:** Switch between Home, Projects, Experience, Skills, About, and Contact.
- **Animated Background:** Fullscreen looping video behind the interface.
- **GitHub Integration:** Automatically retrieves public repositories using the GitHub API.
- **Project Filtering:** Filter repositories by their primary programming language.
- **Customizable Projects:** Hide unwanted repositories and prioritize featured projects through a configuration file.
- **Responsive Design:** Supports desktop and mobile devices.
- **No Frameworks:** Built using HTML, CSS, and JavaScript.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/SebastianKlemkosky/sebastianklemkosky.github.io.git
```

Open `index.html` in your browser.

No build tools or additional dependencies are required.

## Project Structure

```text
├── index.html
├── styles.css
├── js/
│   ├── script.js
│   ├── github-config.js
│   └── github.js
└── assets/
    ├── backgrounds/
    │   └── ring-background.mp4
    ├── images/
    │   └── profile.png
    └── resume.pdf
```

## GitHub Repository Integration

The Projects section automatically retrieves public repositories from GitHub.

Repository visibility and display order are managed through `js/github-config.js`.

Configuration options include:

- GitHub username
- Hidden repositories
- Featured repositories
- Excluding forks
- Excluding archived repositories

Repositories are displayed as project cards with their names, descriptions, primary programming languages, and GitHub links.

## Background Video

The website supports a fullscreen MP4 background video located at:

`assets/backgrounds/ring-background.mp4`

The background is separate from the portfolio content, allowing it to be replaced without changing the site's navigation or layout.

Game footage and other third-party media remain subject to their respective copyright and usage terms.

## Hosting

The website is hosted using GitHub Pages.

**Website:** [sebastianklemkosky.github.io](https://sebastianklemkosky.github.io)

## Technologies

- HTML5
- CSS3
- JavaScript
- GitHub REST API
- GitHub Pages

## About

This portfolio is an ongoing personal project designed to showcase my software engineering experience, technical skills, and programming projects.

The website will continue to evolve as I complete additional projects and improve its design and functionality.
