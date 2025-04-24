// Projects data
const projectsData = [
    {
      title: "Distributed Task Queue",
      description: "A high-performance distributed task queue system built with Go, supporting job prioritization and fault tolerance.",
      image: "/api/placeholder/400/200",
      imageAlt: "Distributed Task Queue architecture diagram",
      tags: ["Go", "Redis", "Distributed Systems"],
      links: [
        { text: "Demo", url: "#", type: "demo" },
        { text: "GitHub", url: "#", type: "github" }
      ]
    },
    {
      title: "E-commerce API Gateway",
      description: "A scalable API gateway that handles authentication, rate limiting, and request routing for a microservices-based e-commerce platform.",
      image: "/api/placeholder/400/200",
      imageAlt: "API Gateway flow diagram",
      tags: ["Node.js", "Express", "MongoDB"],
      links: [
        { text: "Case Study", url: "#", type: "case-study" },
        { text: "GitHub", url: "#", type: "github" }
      ]
    },
    {
      title: "Real-time Analytics Pipeline",
      description: "An event-driven analytics pipeline processing millions of events daily, with real-time dashboarding capabilities.",
      image: "/api/placeholder/400/200",
      imageAlt: "Analytics dashboard screenshot",
      tags: ["Python", "Kafka", "Elasticsearch"],
      links: [
        { text: "Documentation", url: "#", type: "docs" },
        { text: "GitHub", url: "#", type: "github" }
      ]
    }
  ];
  
  // Function to render projects
  export async function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const projectTemplate = document.getElementById('project-template');
    
    if (!projectTemplate || !projectsGrid) return;
    
    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    projectsData.forEach(project => {
      const clone = document.importNode(projectTemplate.content, true);
      
      // Set project image
      const imgElement = clone.querySelector('.project-img img');
      imgElement.src = project.image;
      imgElement.alt = project.imageAlt;
      
      // Set project details
      clone.querySelector('.card-title').textContent = project.title;
      clone.querySelector('.project-description').textContent = project.description;
      
      // Add tags
      const tagsContainer = clone.querySelector('.card-tags');
      project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'card-tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
      });
      
      // Add links
      const linksContainer = clone.querySelector('.card-links');
      project.links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.className = `card-link ${link.type}`;
        linkElement.textContent = link.text;
        linkElement.setAttribute('aria-label', `${link.text} for ${project.title}`);
        if (link.url.startsWith('http')) {
          linkElement.setAttribute('target', '_blank');
          linkElement.setAttribute('rel', 'noopener noreferrer');
        }
        linksContainer.appendChild(linkElement);
      });
      
      // Add the project card to the fragment
      fragment.appendChild(clone);
    });
    
    // Clear any existing content and add all project cards at once
    projectsGrid.innerHTML = '';
    projectsGrid.appendChild(fragment);
  }
  
  // Call the function when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    // Other initialization code...
  });