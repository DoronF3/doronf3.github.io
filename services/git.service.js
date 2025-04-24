export class GitHubService {
  constructor(username, token = null) {
      this.username = username;
      this.apiBase = 'https://api.github.com';
      this.token = token;
  }

  getHeaders() {
      const headers = {
          'Accept': 'application/vnd.github.v3+json'
      };
      if (this.token) headers['Authorization'] = `token ${this.token}`;
      return headers;
  }

  async getUserActivity(maxEvents = 3) {
      try {
          const response = await fetch(`${this.apiBase}/users/${this.username}/events/public?per_page=${maxEvents}`, {
              headers: this.getHeaders()
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

  async getLatestCommits(limit = 3) {
      try {
          const commits = await this.getUserActivity(20);
          return this.formatCommits(commits, limit);
      } catch (err) {
          console.error('Error fetching latest commits:', err);
          return [];
      }
  }

  formatCommits(commits, limit) {
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
              ...commit,
              formattedDate: commit.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          }));

      return sorted;
  }
}
