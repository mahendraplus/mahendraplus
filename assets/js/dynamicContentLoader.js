
  // Get all the navbar buttons
  const navbarLinks = document.querySelectorAll('.navbar-link');
  
  // Reference to dynamic content loader
  const dynamicContentLoader = document.getElementById('dynamicContentLoader');
  
  // Function to remove 'active' class from all navbar links
  function deactivateAllLinks() {
    navbarLinks.forEach(link => link.classList.remove('active'));
  }

  // Function to load content based on the button clicked
  function loadContent(page) {
    // Create the article dynamically based on the page name
    const article = document.createElement('article');
    article.classList.add(page); // Add the page name as a class
    article.classList.add('active'); // Make it active

    // Create header and title for the article
    const header = document.createElement('header');
    const h2 = document.createElement('h2');
    h2.classList.add('h2', 'article-title');
    h2.textContent = `${page.charAt(0).toUpperCase() + page.slice(1)} Page`; // Capitalize the first letter of page
    header.appendChild(h2);

    // Create the content section
    const section = document.createElement('section');
    section.classList.add('content');
    section.innerHTML = `<p>This is the ${page} content. You can replace this with dynamic content or fetch data from a URL.</p>`;
    
    // Append content to the article
    article.appendChild(header);
    article.appendChild(section);
    
    // Clear existing content and append the new article
    dynamicContentLoader.innerHTML = ''; // Clear previous content
    dynamicContentLoader.appendChild(article);
  }

  // Handle click on navbar items
  navbarLinks.forEach(link => {
    link.addEventListener('click', function() {
      const page = this.getAttribute('data-nav-link'); // Get the page name from the button's data attribute
      
      // Deactivate all links and activate the clicked one
      deactivateAllLinks();
      this.classList.add('active');
      
      // Load content dynamically for the clicked page
      loadContent(page);
    });
  });

  // Optionally load content for the first item by default
  loadContent('about'); // Initially load the 'about' page content
