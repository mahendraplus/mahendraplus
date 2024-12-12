
  // Get the query parameters from the URL
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page'); // Extract the 'page' parameter
  const title = params.get('title'); // Extract the 'title' parameter
  const msg = params.get('msg'); // Extract the 'msg' parameter
  const htmlContent = params.get('html'); // Extract the 'html' parameter

  // Get references to the target elements
  const pageNameElement = document.querySelector('.article-title');
  const dynamicContentLoader = document.getElementById('dynamicContentLoader');
  const messageContainer = document.createElement('div'); // Container for the custom message

  // Check for 'page' and 'title' parameters
  if (page) {
    // Dynamically set the page name for the article
    const article = document.querySelector(`article[data-page="${page}"]`);
    if (article) {
      pageNameElement.textContent = title || 'Default Title'; // Display title or default
      article.classList.add('active'); // Add the 'active' class to show this article
    }
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
