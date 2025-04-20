/**
 * GitHub Service
 * 
 * This service fetches the latest commits from all public repositories
 * of a GitHub user without needing to specify individual repositories.
 */

class GitHubService {
    constructor(username) {
      this.username = username;
      this.apiBase = 'https://api.github.com';
      // Optional: Add your GitHub token for higher rate limits
      this.token = null; // 'YOUR_GITHUB_TOKEN';
    }
  
    /**
     * Get the request headers for GitHub API calls
     */
    getHeaders() {
      const headers = {
        'Accept': 'application/vnd.github.v3+json'
      };
      
      if (this.token) {
        headers['Authorization'] = `token ${this.token}`;
      }
      
      return headers;
    }
  
    /**
     * Get recent activity across all public repositories
     */
    async getUserActivity(maxEvents = 3) {
      try {
        const response = await fetch(`${this.apiBase}/users/${this.username}/events/public?per_page=${maxEvents}`, {
          headers: this.getHeaders()
        });
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const events = await response.json();
        
        // Filter only push events (commits)
        const pushEvents = events.filter(event => event.type === 'PushEvent');
        
        // Extract commit information
        const commits = [];
        
        pushEvents.forEach(event => {
          const repoName = event.repo.name.split('/')[1];
          
          event.payload.commits.forEach(commit => {
            commits.push({
              repo: repoName,
              hash: commit.sha.substring(0, 7),
              title: commit.message.split('\n')[0],
              message: commit.message,
              date: new Date(event.created_at),
              url: `https://github.com/${event.repo.name}/commit/${commit.sha}`
            });
          });
        });
        
        return commits;
      } catch (error) {
        console.error('Error fetching user activity:', error);
        return [];
      }
    }
  
    /**
     * Get the latest commits across all repositories
     */
    async getLatestCommits(limit = 3) {
      try {
        // Method 1: Use the events API (faster but limited to recent activity)
        const activityCommits = await this.getUserActivity();
        
        if (activityCommits.length >= limit) {
          return this.formatCommits(activityCommits, limit);
        }
        
      } catch (error) {
        console.error('Error fetching latest commits:', error);
        return [];
      }
    }
  
    /**
     * Format and sort the commits
     */
    formatCommits(commits, limit) {
      // Sort by date (newest first)
      const sortedCommits = commits.sort((a, b) => b.date - a.date);
      
      // Remove duplicates (same commit hash)
      const uniqueCommits = [];
      const seenHashes = new Set();
      
      for (const commit of sortedCommits) {
        if (!seenHashes.has(commit.hash)) {
          seenHashes.add(commit.hash);
          
          // Format the date for display
          commit.formattedDate = commit.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          uniqueCommits.push(commit);
          
          if (uniqueCommits.length >= limit) {
            break;
          }
        }
      }
      
      return uniqueCommits;
    }
  }
  
  // Export the service
  export default GitHubService;