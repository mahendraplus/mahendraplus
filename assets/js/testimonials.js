
  async function loadTestimonials() {
    const jsonUrl = 'https://mahendraplus.github.io/assets/json/testimonials.json';
    try {
      const response = await fetch(jsonUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const testimonials = await response.json();
      const testimonialsList = document.getElementById('testimonials-list');

      // Clear the list before populating
      testimonialsList.innerHTML = '';

      // Create testimonials items
      testimonials.forEach((item) => {
        const testimonialItem = document.createElement('li');
        testimonialItem.className = 'testimonials-item';

        testimonialItem.innerHTML = `
          <div class="content-card" data-testimonials-item>
            <figure class="testimonials-avatar-box">
              <img src="${item.avatar}" alt="${item.name}" width="60" data-testimonials-avatar>
            </figure>
            <h4 class="h4 testimonials-item-title" data-testimonials-title>${item.name}</h4>
            <div class="testimonials-text" data-testimonials-text>
              <p>${item.testimonial}</p>
            </div>
          </div>
        `;

        testimonialsList.appendChild(testimonialItem);
      });
    } catch (error) {
      console.error('Failed to load testimonials:', error);
    }
  }

  // Load testimonials on page load
  document.addEventListener('DOMContentLoaded', loadTestimonials);
