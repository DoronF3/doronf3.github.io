export async function renderGitHubCommits(githubService) {
    const grid = document.querySelector('.github-grid');
    const template = document.getElementById('commit-template');
    if (!grid || !template) return;

    grid.innerHTML = '<div class="loading">Loading commits...</div>';
    try {
        const commits = await githubService.getLatestCommits(3);
        grid.innerHTML = '';

        if (!commits.length) {
            grid.innerHTML = '<div class="no-data">No recent GitHub activity found.</div>';
            return;
        }

        const fragment = document.createDocumentFragment();
        commits.forEach(commit => {
            const clone = document.importNode(template.content, true);
            clone.querySelector('.commit-repo').textContent = commit.repo;
            clone.querySelector('.commit-hash').textContent = commit.hash;
            clone.querySelector('.commit-message').textContent = 
                commit.message.length > 120 ? commit.message.slice(0, 120) + '...' : commit.message;
            clone.querySelector('.commit-date').textContent = commit.formattedDate;
            clone.querySelector('.card-link').href = commit.url;
            fragment.appendChild(clone);
        });

        grid.appendChild(fragment);
    } catch (err) {
        grid.innerHTML = '<div class="error">Failed to load GitHub commits. Please try again later.</div>';
        console.error('Error rendering GitHub commits:', err);
    }
}
