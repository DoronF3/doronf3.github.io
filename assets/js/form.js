export async function initContactForm() {
    const form = document.getElementById('contact-form');
  
    if (!form) {
      console.error('Contact form not found');
      return;
    }
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Gather values
      const formData = new FormData(form);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const subject = formData.get('subject').trim();
      const message = formData.get('message').trim();
  
      // Simple client-side validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
      }
  
      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
  
      try {
        // Send to Formspree
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Form submission failed');
        }
  
        // Success message
        alert('Message sent successfully!');
        form.reset();
      } catch (error) {
        console.error('Form submission error:', error);
        alert(`An error occurred: ${error.message || 'Please try again later.'}`);
      } finally {
        // Restore button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }