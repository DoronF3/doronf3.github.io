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
    
    // GitHub commits data
    const commits = [
        {
            repo: 'distributed-task-queue',
            hash: 'a7e9f23',
            title: 'Add Redis cluster support',
            message: 'Implemented Redis cluster support for horizontal scaling with automatic sharding and failover capabilities.',
            date: 'April 15, 2025',
            url: '#'
        },
        {
            repo: 'api-gateway',
            hash: 'b2d4c18',
            title: 'Optimize rate limiter',
            message: 'Optimized the rate limiting middleware to reduce memory usage by 40% and improve throughput by implementing a sliding window algorithm.',
            date: 'April 12, 2025',
            url: '#'
        },
        {
            repo: 'analytics-pipeline',
            hash: 'e5f8d72',
            title: 'Add Prometheus metrics',
            message: 'Added comprehensive Prometheus metrics for better observability and alerting capabilities across the event processing pipeline.',
            date: 'April 10, 2025',
            url: '#'
        }
    ];
    
    // Populate GitHub commits
    const githubGrid = document.querySelector('.github-grid');
    const template = document.getElementById('commit-template');
    
    if (template && githubGrid) {
        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        commits.forEach(commit => {
            const clone = document.importNode(template.content, true);
            
            clone.querySelector('.commit-repo').textContent = commit.repo;
            clone.querySelector('.commit-hash').textContent = commit.hash;
            clone.querySelector('.commit-title').textContent = commit.title;
            clone.querySelector('.commit-message').textContent = commit.message;
            clone.querySelector('.commit-date').textContent = commit.date;
            clone.querySelector('.card-link').href = commit.url;
            
            fragment.appendChild(clone);
        });
        
        // Single DOM update for better performance
        githubGrid.appendChild(fragment);
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
});