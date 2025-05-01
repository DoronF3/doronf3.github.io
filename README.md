# Doron Firman - Personal Portfolio Website

## Table of Contents
1. [Overview](#-overview)
2. [Features](#-features)
3. [Project Structure](#-project-structure)
4. [Technologies Used](#️-technologies-used)
5. [Implementation Details](#-implementation-details)
6. [Local Development](#-local-development)
7. [Connect With Me](#-connect-with-me)

---

## ✨ [Overview](#-overview)

A modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. The site showcases my skills, projects, and GitHub activity with a clean, component-based architecture that supports both light and dark themes.

---

## 🚀 [Features](#-features)

- **📱 Responsive Design**: Mobile-first approach that works flawlessly on all devices  
- **🌓 Theme Toggle**: Light and dark mode with system preference detection  
- **🧩 Component Architecture**: Modular HTML components loaded dynamically  
- **📝 Contact Form**: Integrated form handling via Formspree  
- **⚡ Performance Optimized**: WebP images, preloading, and minimal dependencies  

---

## 📂 [Project Structure](#-project-structure)

```
/
├── components/              # HTML components
├── assets/
│   ├── css/                 # Stylesheets
│   │   ├── components/      # Component-specific styles
│   │   └── utils/           # Utility styles
│   ├── favicon/             # Favicon & PWA assets
│   ├── img/                 # Optimized images
│   └── js/                  # JavaScript modules
└── .github/                 # GitHub Actions workflows
```

---

## 🛠️ [Technologies Used](#️-technologies-used)

### Frontend
- **HTML5**: Semantic markup for better accessibility and SEO  
- **CSS3**: Modern styling with Custom Properties, Flexbox, and Grid  
- **JavaScript (ES6+)**: Modular, clean, and efficient scripting  

### Backend & APIs
- **GitHub API**: Fetches and displays real-time commit activity  
- **Formspree**: Handles contact form submissions seamlessly  

### Storage & Persistence
- **LocalStorage**: Saves user preferences like theme selection  

### Automation & CI/CD
- **GitHub Actions**: Automates workflows, including updating commit data  

### Progressive Web App (PWA)
- **Web App Manifest**: Enables installation and offline capabilities  
- **Favicon Set**: Comprehensive icons for all devices and platforms  

<p align="center">
    <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&amp;logo=html5&amp;logoColor=white">
    <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&amp;logo=css3&amp;logoColor=white">
    <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&amp;logo=javascript&amp;logoColor=black">
    <img alt="GitHub Actions" src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&amp;logo=github-actions&amp;logoColor=white">
    <img alt="PWA" src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&amp;logo=googlechrome&amp;logoColor=white">
</p>

---

## 🔍 [Implementation Details](#-implementation-details)

The website uses a component loader pattern where the `index.html` file contains placeholder divs populated with components loaded via `components.js`. This creates a modular structure that's easy to maintain and extend.

### Key Features Explained

- **Dynamic Components**: HTML components are loaded asynchronously and inserted into the DOM  
- **Theme System**: Detects system preferences with user override capability  
- **Mobile Navigation**: Smooth hamburger menu animation with backdrop for mobile devices  
- **Projects Showcase**: Dynamically rendered from JavaScript data objects  

---

## 🧪 [Local Development](#-local-development)

Clone the repository:

```bash
git clone https://github.com/DoronF3/doronf3.github.io.git
```

Open the project in your favorite code editor.

Preview with a local server:

```bash
# Using Python
python -m http.server

# Using Node.js with live-server
npx live-server
```

---

## 📱 [Connect With Me](#-connect-with-me)

<p align="center">
    <a href="https://github.com/DoronF3">
        <img alt="GitHub" src="https://img.shields.io/badge/GitHub-DoronF3-181717?style=for-the-badge&amp;logo=github">
    </a>
    <a href="https://linkedin.com/in/DoronF3">
        <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-DoronF3-0A66C2?style=for-the-badge&amp;logo=linkedin">
    </a>
    <a href="mailto:doronfi3@gmail.com">
        <img alt="Email" src="https://img.shields.io/badge/Email-doronfi3@gmail.com-EA4335?style=for-the-badge&amp;logo=gmail">
    </a>
</p>

---

<p align="center">
    <img alt="GitHub Actions Workflow Status" src="https://github.com/DoronF3/doronf3.github.io/workflows/Update%20Latest%20Commits/badge.svg">
</p>

<p align="center">
    <sub>Built with ❤️ by Doron Firman</sub>
</p>