  // Get the query parameters from the URL
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page'); // Extract the 'page' parameter
  const url = params.get('url'); // Extract the 'url' parameter
  const msg = params.get('msg'); // Extract the 'msg' parameter

  // Get references to the target elements
  const pageNameElement = document.getElementById('page-name');
  const customHtmlElement = document.getElementById('custom-html');
  const messageContainer = document.createElement('div'); // Container for the custom message

  // Function to fetch and display data from a URL
  async function fetchAndDisplayUrlContent(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching URL: ${response.status}`);
      }
      const data = await response.text();
      customHtmlElement.innerHTML = data; // Load fetched data into the custom HTML container
    } catch (error) {
      customHtmlElement.innerHTML = `<p>Error: Unable to load the content. ${error.message}</p>`;
    }
  }

  // Check for 'page', 'url', and 'msg' parameters
  if (page) {
    pageNameElement.textContent = page; // Display the page name in the header
  }
  if (url) {
    fetchAndDisplayUrlContent(url); // Fetch and display the URL content
  } else {
    customHtmlElement.innerHTML = `<p>Error: No URL provided in the query parameters.</p>`;
  }
  if (msg) {
    messageContainer.innerHTML = `<p>Message: ${msg}</p>`; // Display the custom message
    messageContainer.style.marginTop = '20px';
    messageContainer.style.padding = '10px';
    messageContainer.style.border = '1px solid #ccc';
    messageContainer.style.backgroundColor = '#f9f9f9';
    customHtmlElement.appendChild(messageContainer);
  }
