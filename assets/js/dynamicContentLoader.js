
  // Get the query parameters from the URL
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page'); // Extract the 'page' parameter
  const title = params.get('title'); // Extract the 'title' parameter
  const msg = params.get('msg'); // Extract the 'msg' parameter
  const htmlContent = params.get('html'); // Extract the 'html' parameter

  // Select all articles
  const articles = document.querySelectorAll('article');
  // Default section if no valid page is provided
  const defaultPage = 'about';
  // Flag to check if a matching page was found
  let isPageFound = false;

  // Get references to the target elements
  const pageNameElement = document.querySelector('.article-title');
  const dynamicContentLoader = document.getElementById('dynamicContentLoader');
  const messageContainer = document.createElement('div'); // Container for the custom message

  // Loop through articles to show the matched one
  articles.forEach(article => {
    if (article.dataset.page === page) {
      article.classList.add('active'); // Add 'active' class to show
      isPageFound = true; // A matching page was found
    } else {
      article.classList.remove('active'); // Hide other sections
    }
  });

  // Show the default page if no matching page was found
  if (!isPageFound) {
    const defaultArticle = document.querySelector(`article[data-page="${defaultPage}"]`);
    if (defaultArticle) {
      defaultArticle.classList.add('active');
    }
  }

  // Set the title for the page
  if (title) {
    pageNameElement.textContent = title; // Set title in the article header
  }

  // Display custom message if provided
  if (msg) {
    messageContainer.innerHTML = `<p>Message: ${msg}</p>`; // Display the custom message
    messageContainer.style.marginTop = '20px';
    messageContainer.style.padding = '10px';
    messageContainer.style.border = '1px solid #ccc';
    messageContainer.style.backgroundColor = '#f9f9f9';
    dynamicContentLoader.appendChild(messageContainer);
  }

  // Check if 'html' content is provided and load it into the div
  if (htmlContent) {
    dynamicContentLoader.innerHTML += decodeURIComponent(htmlContent); // Decode and insert the HTML content
  } else {
    dynamicContentLoader.innerHTML = `<p>Error: No HTML content provided.</p>`; // Error message if no HTML is provided
  }
