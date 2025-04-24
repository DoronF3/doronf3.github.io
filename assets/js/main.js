import { GitHubService } from '../../services/git.service.js';
import { initThemeToggle } from './theme.js';
import { initMobileMenu } from './mobileMenu.js';
import { initScrollHighlight } from './scrollHighlights.js';
import { renderGitHubCommits } from './renderCommits.js';
import { renderProjects } from './renderProjects.js';

window.initializeScripts = function() {
    console.log('Initializing scripts after components are loaded');
    
    // Initialize UI components
    initThemeToggle();
    initMobileMenu();
    initScrollHighlight();

    // Initialize GitHub service and render commits
    const githubService = new GitHubService('DoronF3');
    renderProjects();
    renderGitHubCommits(githubService);
};
