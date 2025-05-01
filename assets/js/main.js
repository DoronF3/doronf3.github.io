import { initThemeToggle } from './theme.js';
import { initMobileMenu } from './mobileMenu.js';
import { initScrollHighlight } from './scrollHighlights.js';
import { renderGitHubCommits } from './renderCommits.js';
import { renderProjects } from './renderProjects.js';
import { initContactForm } from './form.js';

window.initializeScripts = async function() {
    console.log('Initializing scripts after components are loaded');
    
    // Initialize UI components
    initThemeToggle();
    initMobileMenu();
    initScrollHighlight();
    initContactForm();

    // Initialize projects and GitHub commits
    renderProjects();
    await renderGitHubCommits(); // Now using the pre-generated data
};