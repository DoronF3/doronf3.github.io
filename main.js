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
        const activityCommits = await this.getUserActivity(20); // Fetch more events to have enough commits
        
        if (activityCommits.length > 0) {
          return this.formatCommits(activityCommits, limit);
        }
        
        // If no commits found, return empty array
        return [];
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

// Theme toggling functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// DOM content loaded event handling - single listener
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Set initial theme based on user's previous preference or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        // Add click event to toggle theme
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const navDrawer = document.getElementById('nav-drawer');
    
    if (menuToggle && navDrawer) {
        // Toggle mobile menu with ARIA attributes and backdrop
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.classList.toggle('active');
            navDrawer.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.classList.toggle('menu-open');
            
            // Create or toggle backdrop
            let backdrop = document.querySelector('.menu-backdrop');
            if (!backdrop && navDrawer.classList.contains('active')) {
                backdrop = document.createElement('div');
                backdrop.className = 'menu-backdrop';
                document.body.appendChild(backdrop);
                setTimeout(() => backdrop.classList.add('active'), 10);
                
                // Close menu when clicking backdrop
                backdrop.addEventListener('click', function() {
                    menuToggle.click();
                });
            } else if (backdrop) {
                backdrop.classList.toggle('active');
                if (!backdrop.classList.contains('active')) {
                    setTimeout(() => {
                        backdrop.remove();
                    }, 300);
                }
            }
            
            // If menu is now open, move focus to the first link for better keyboard navigation
            if (navDrawer.classList.contains('active')) {
                setTimeout(() => {
                    const firstLink = navDrawer.querySelector('a');
                    if (firstLink) firstLink.focus();
                }, 300); // Wait for animation to complete
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navDrawer.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navDrawer.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
                
                // Remove backdrop if it exists
                const backdrop = document.querySelector('.menu-backdrop');
                if (backdrop) {
                    backdrop.classList.remove('active');
                    setTimeout(() => backdrop.remove(), 300);
                }
            });
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navDrawer && menuToggle && 
            !navDrawer.contains(event.target) && 
            !menuToggle.contains(event.target) && 
            navDrawer.classList.contains('active')) {
            
            menuToggle.classList.remove('active');
            navDrawer.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
            
            // Remove backdrop if it exists
            const backdrop = document.querySelector('.menu-backdrop');
            if (backdrop) {
                backdrop.classList.remove('active');
                setTimeout(() => backdrop.remove(), 300);
            }
        }
    });
    
    // Track active section for navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinksHighlight = document.querySelectorAll('.nav-links a');
    
    // Debounce function to limit scroll event firing
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Highlight active section - debounced for performance
    const highlightActiveSection = debounce(function() {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset for better UX
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && 
                scrollPosition <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksHighlight.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }, 50);
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Initialize GitHub service
    const githubService = new GitHubService('DoronF3'); // Replace with your GitHub username
  
    // Render GitHub commits
    async function renderGitHubCommits() {
        const githubGrid = document.querySelector('.github-grid');
        const template = document.getElementById('commit-template');
        
        if (!template || !githubGrid) return;
        
        // Show loading state
        githubGrid.innerHTML = '<div class="loading">Loading commits...</div>';
        
        try {
        // Fetch latest commits across all public repositories
        const commits = await githubService.getLatestCommits(3); // Get 3 latest commits
        
        // Clear loading state
        githubGrid.innerHTML = '';
        
        if (commits.length === 0) {
            githubGrid.innerHTML = '<div class="no-data">No recent GitHub activity found.</div>';
            return;
        }
        
        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        commits.forEach(commit => {
            const clone = document.importNode(template.content, true);
            
            clone.querySelector('.commit-repo').textContent = commit.repo;
            clone.querySelector('.commit-hash').textContent = commit.hash;
            
            // Limit commit message length with ellipsis if too long
            const message = commit.message;
            const charLimit = 120;
            clone.querySelector('.commit-message').textContent = 
            message.length > charLimit ? message.substring(0, charLimit) + '...' : message;
            
            clone.querySelector('.commit-date').textContent = commit.formattedDate;
            clone.querySelector('.card-link').href = commit.url;
            
            fragment.appendChild(clone);
        });
        
        // Single DOM update for better performance
        githubGrid.appendChild(fragment);
        } catch (error) {
        githubGrid.innerHTML = '<div class="error">Failed to load GitHub commits. Please try again later.</div>';
        console.error('Error rendering GitHub commits:', error);
        }
    }

    const linkedinPosts = [
        {
            content: "Excited to share that I've just completed optimizing our API gateway, resulting in a 40% reduction in memory usage and significantly improved throughput by implementing a sliding window algorithm for rate limiting.",
            date: "April 13, 2025",
            likes: 142,
            comments: 28,
            url: "#"
        },
        {
            content: "Just published a deep dive on Redis cluster implementations for distributed task queues. Learn how we achieved horizontal scaling with automatic sharding and failover capabilities in our latest project.",
            date: "April 8, 2025",
            likes: 96,
            comments: 15,
            url: "#"
        },
        {
            content: "Observability is key to maintaining reliable systems. I've recently added comprehensive Prometheus metrics to our analytics pipeline, enabling better monitoring and alerting. Here's what we learned in the process...",
            date: "April 3, 2025",
            likes: 118,
            comments: 22,
            url: "#"
        }
    ];

    const linkedinGrid = document.querySelector('.linkedin-grid');
    const linkedinTemplate = document.getElementById('linkedin-post-template');
    
    if (linkedinTemplate && linkedinGrid) {
        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        linkedinPosts.forEach(post => {
            const clone = document.importNode(linkedinTemplate.content, true);
            
            clone.querySelector('.linkedin-date').textContent = post.date;
            
            // Limit LinkedIn post content length with ellipsis if too long
            const content = post.content;
            const charLimit = 180;
            clone.querySelector('.linkedin-content').textContent = 
                content.length > charLimit ? content.substring(0, charLimit) + '...' : content;
            
            clone.querySelector('.likes-count').textContent = post.likes;
            clone.querySelector('.comments-count').textContent = post.comments;
            clone.querySelector('.linkedin-read-more a').href = post.url;
            
            fragment.appendChild(clone);
        });
        
        // Single DOM update for better performance
        linkedinGrid.appendChild(fragment);
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form submission logic here
            console.log('Form submitted');
        });
    }

    // Call the function to render the commits
    renderGitHubCommits();
});