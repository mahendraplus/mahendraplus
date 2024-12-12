
  // Get the query parameters from the URL
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page'); // Extract the 'page' parameter
  const title = params.get('title'); // Extract the 'title' parameter
  const msg = params.get('msg'); // Extract the 'msg' parameter
  const htmlContent = params.get('html'); // Extract the 'html' parameter

  // Get reference to the dynamicContentLoader div
  const dynamicContentLoader = document.getElementById('dynamicContentLoader');
  
  // Create the article element with dynamic data
  const article = document.createElement('article');
  article.classList.add(page || 'about'); // Set class for article (default is 'about')
  article.classList.add('active'); // Add the 'active' class to show the article
  article.dataset.page = page || 'about'; // Set the data-page attribute
  
  // Create the header with the title
  const header = document.createElement('header');
  const h2 = document.createElement('h2');
  h2.classList.add('h2', 'article-title');
  h2.textContent = title || 'Default Title'; // Set title from URL or default
  header.appendChild(h2);
  
  // Create the section for the message
  const sectionAboutText = document.createElement('section');
  sectionAboutText.classList.add('about-text');
  const p = document.createElement('p');
  p.textContent = msg || 'No message provided.'; // Set message from URL or default
  sectionAboutText.appendChild(p);

  // Create the section for custom HTML content
  const sectionService = document.createElement('section');
  sectionService.classList.add('service');
  if (htmlContent) {
    sectionService.innerHTML = decodeURIComponent(htmlContent); // Load custom HTML content
  } else {
    sectionService.innerHTML = '<p>No custom HTML content available.</p>'; // Default message if no HTML
  }

  // Append all sections to the article
  article.appendChild(header);
  article.appendChild(sectionAboutText);
  article.appendChild(sectionService);

  // Append the article to the dynamicContentLoader div
  dynamicContentLoader.appendChild(article);
