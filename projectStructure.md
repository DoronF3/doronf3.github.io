/
├── assets/
│   ├── css/                  - Stylesheets
│   │   ├── components/       - Component-specific styles
│   │   │   ├── about.css     - About section styling
│   │   │   ├── cards.css     - Card component styling
│   │   │   ├── contact.css   - Contact form styling
│   │   │   ├── footer.css    - Footer styling
│   │   │   ├── github.css    - GitHub activity section styling
│   │   │   ├── header.css    - Header and navigation styling
│   │   │   ├── hero.css      - Hero section styling
│   │   │   └── projects.css  - Projects section styling
│   │   ├── utils/
│   │   │   ├── layout.css    - Common layout utilities
│   │   │   └── responsive.css - Responsive design styles
│   │   ├── 404.css           - 404 page styling
│   │   ├── base.css          - Base CSS styles and resets
│   │   ├── style.css         - Main CSS entry point (imports all styles)
│   │   └── variables.css     - CSS variables and theme definitions
│   ├── img/                  - Image assets
│   │   ├── gitProfileImage.webp
│   │   ├── loanImage.webp
│   │   ├── myImage.webp
│   │   └── wildfireIamge.webp
│   └── js/                   - JavaScript files
│       ├── components.js     - Loads HTML components dynamically
│       ├── main.js           - Main JavaScript entry point
│       ├── mobileMenu.js     - Mobile menu functionality
│       ├── renderCommits.js  - Renders GitHub commit activity
│       ├── renderProjects.js - Renders project cards from data
│       ├── scrollHighlights.js - Navigation highlighting on scroll
│       └── theme.js          - Theme toggle (light/dark) functionality
├── components/               - HTML components for composition
│   ├── about.html            - About section with skills
│   ├── contact.html          - Contact form section
│   ├── footer.html          - Footer with social links
│   ├── github.html          - GitHub activity display
│   ├── header.html          - Header with navigation
│   ├── hero.html            - Hero section
│   └── projects.html        - Projects section with card templates
├── services/
│   └── git.service.js       - GitHub API integration service
├── 404.html                 - Custom 404 error page (terminal-style)
├── _config.yml              - Configuration file (empty)
├── index.html               - Main HTML entry point
├── projectStructure.md      - Project directory structure documentation
└── README.md                - Project documentation