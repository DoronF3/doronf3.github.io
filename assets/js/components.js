// components.js
import { initializeScripts } from './main.js';

async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${componentPath}: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Loading components...');
    
    await Promise.all([
        loadComponent('header-component', './components/header.html'),
        loadComponent('hero-component', './components/hero.html'),
        loadComponent('about-component', './components/about.html'),
        loadComponent('projects-component', './components/projects.html'),
        loadComponent('github-component', './components/github.html'),
        loadComponent('contact-component', './components/contact.html'),
        loadComponent('footer-component', './components/footer.html')
    ]);

    console.log('All components loaded!');
    await initializeScripts();
});

// Restore theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}
