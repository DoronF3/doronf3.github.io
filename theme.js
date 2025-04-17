document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Set initial theme based on user's previous preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If no saved preference, check system preference
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Add click event to toggle theme
    themeToggle.addEventListener('click', function() {
        // Get the current theme from the HTML element or default to 'light'
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        
        // Toggle to the opposite theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Set the new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save the user's preference to localStorage for persistence across page loads
        localStorage.setItem('theme', newTheme);
    });
    
    // Mobile menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const navDrawer = document.getElementById('nav-drawer');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navDrawer.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navDrawer.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navDrawer.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navDrawer.contains(event.target) && !menuToggle.contains(event.target) && navDrawer.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navDrawer.classList.remove('active');
        }
    });
});
