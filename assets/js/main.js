import { GitHubService } from './services/git.service.js';
import { initThemeToggle } from './theme.js';
import { initMobileMenu } from './mobileMenu.js';
import { initScrollHighlight } from './scrollHighlight.js';
import { renderGitHubCommits } from './renderCommits.js';

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initScrollHighlight();

    const githubService = new GitHubService('DoronF3');
    renderGitHubCommits(githubService);
});
