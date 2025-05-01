const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const username = process.env.USERNAME;
const token = process.env.GITHUB_TOKEN;
const apiBase = 'https://api.github.com';
const outputPath = path.join(__dirname, '../../assets/js/data/commits.json');

// Ensure directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function getHeaders() {
    const headers = {
        'Accept': 'application/vnd.github.v3+json'
    };
    if (token) headers['Authorization'] = `token ${token}`;
    return headers;
}

async function getUserActivity(maxEvents = 20) {
    try {
        const response = await fetch(`${apiBase}/users/${username}/events/public?per_page=${maxEvents}`, {
            headers: await getHeaders()
        });

        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const events = await response.json();
        const pushEvents = events.filter(e => e.type === 'PushEvent');

        return pushEvents.flatMap(event => {
            const repoName = event.repo.name.split('/')[1];
            return event.payload.commits.map(commit => ({
                repo: repoName,
                hash: commit.sha.substring(0, 7),
                message: commit.message,
                date: new Date(event.created_at),
                url: `https://github.com/${event.repo.name}/commit/${commit.sha}`
            }));
        });
    } catch (err) {
        console.error('Error fetching user activity:', err);
        return [];
    }
}

function formatCommits(commits, limit) {
    const seen = new Set();
    const sorted = commits
        .sort((a, b) => b.date - a.date)
        .filter(commit => {
            if (seen.has(commit.hash)) return false;
            seen.add(commit.hash);
            return true;
        })
        .slice(0, limit)
        .map(commit => ({
            repo: commit.repo,
            hash: commit.hash,
            message: commit.message,
            url: commit.url,
            date: commit.date.toISOString(),
            formattedDate: new Date(commit.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })
        }));

    return sorted;
}

async function main() {
    try {
        console.log(`Fetching latest commits for ${username}...`);
        const commits = await getUserActivity(20);
        const formattedCommits = formatCommits(commits, 3); // Match your existing limit of 3
        
        // Write commits to file
        fs.writeFileSync(outputPath, JSON.stringify(formattedCommits, null, 2));
        console.log(`Successfully saved ${formattedCommits.length} commits to ${outputPath}`);
    } catch (error) {
        console.error('Failed to update commits:', error);
        process.exit(1);
    }
}

main();