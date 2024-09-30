const newFormHandler = async (event) => {
    event.preventDefault();
  
    // Creating a blogPost request
    const title = document.querySelector('#blogPost-title').value.trim();
    const description = document.querySelector('#blogPost-desc').value.trim();
  
    if (title && description) {
      const response = await fetch(`/api/blogPosts`, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create Blog Post!');
      }
    }
  };
  
  // Deleting a blogPost request
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogPosts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete Blog Post!');
      }
    }
  };
  
  document
    .querySelector('.new-blogPost-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.blogPost-list')
    .addEventListener('click', delButtonHandler);
  