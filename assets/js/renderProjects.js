// Projects data
const projectsData = [
    {
      title: "Loan Performance Analysis System",
      description: "A comprehensive financial analytics platform that analyzes lending data, calculates default rates, and models prepayment behavior using statistical distributions.",
      image: "assets/img/loanImage.webp",
      imageAlt: "Financial analytics dashboard showing loan performance metrics",
      tags: ["Python", "Pandas", "Data Visualization", "Financial Analytics"],
      links: [
        { text: "GitHub", url: "https://github.com/DoronF3/School-Projects/tree/main/Financial%20Analytics/Ex4", type: "github" },
      ]
    },
    {
      title: "Dynamic GitHub Profile README",
      description: "An automated GitHub workflow that updates my profile README with real-time weather data for Modi'in, Israel using Python and the OpenWeatherMap API. The workflow runs every 3 hours to show current weather conditions, sunrise/sunset times, and automatically tracks refresh timestamps.",
      image: "assets/img/gitProfileImage.webp",
      imageAlt: "GitHub Actions workflow diagram showing weather data integration",
      tags: ["Python", "GitHub Actions", "API Integration", "Automation"],
      links: [
        { text: "GitHub", url: "https://github.com/DoronF3/DoronF3", type: "github" },
      ]
    },
    {
      title: "Wildfire Cause Prediction",
      description: "An advanced machine learning project using neural networks to predict wildfire causes based on geographical, temporal, and climate features. The model incorporates feature engineering techniques like cyclic time encoding, climate data integration, and uses a sophisticated architecture with batch normalization and dropout layers to achieve high prediction accuracy.",
      image: "assets/img/wildfireIamge.webp",
      imageAlt: "Neural network diagram showing wildfire prediction model architecture",
      tags: ["Python", "TensorFlow", "Neural Networks", "Jupyter", "Data Science", "Climate Data"],
      links: [
        { text: "GitHub", url: "https://github.com/DoronF3/School-Projects/blob/main/Machine%20Learning/Ml%20Final/ML%20Final%20Project.ipynb", type: "github" },
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