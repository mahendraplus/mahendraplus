// Get the query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page'); // Extract the 'page' parameter
    // Select all articles
    const articles = document.querySelectorAll('article');
    // Default section if no valid page is provided
    const defaultPage = 'about';
    // Flag to check if a matching page was found
    let isPageFound = false;
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
      const defaultArticle = document.querySelector(article[data-page="${defaultPage}"]);
      if (defaultArticle) {
        defaultArticle.classList.add('active');
      }
    }
