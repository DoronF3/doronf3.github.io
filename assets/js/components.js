// Function to load HTML components
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

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Loading components...');
    
    // Load all components
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
    
    // Initialize scripts from main.js after components are loaded
    if (window.initializeScripts) {
        window.initializeScripts();
    } else {
        console.error('initializeScripts function not found');
    }
});

// Initialize theme from localStorage on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}