const inputButton = document.getElementById('commentButton');
const updateButton = document.getElementById('updateButton');
// Only render delete and update button if the logged in user is the original commenter or poster
const renderButtons = async () => {
  const deleteButton = document.querySelectorAll('.col-3 button');
  const response = await fetch('/user');
  const user = await response.json();
  
  deleteButton.forEach( async button => {
    if ( button.getAttribute('data-id') ){
        if(user.user_id == button.getAttribute('data-id')){
          button.style.display = 'grid';
          button.addEventListener('click', delButtonHandler);
        }
    }
  });

  console.log(user.user_id, updateButton.getAttribute('data-id') )
  if(user.user_id == updateButton.getAttribute('data-id')){
    updateButton.style.display = 'grid';
    updateButton.addEventListener('click', updatePostHandler)
  }

}

// Creating a comment after clicking the button
const handleComment = async () => {
    event.preventDefault();
    const text = document.getElementById('commentInput').value.trim();
    const blogPost_id = inputButton.getAttribute('data-id');
    if(text){
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ text, blogPost_id }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            // If successful, alert the user
            document.location.reload();
          } else {
            console.log(text, blogPost_id);
            alert(response.statusText);
          }
    }
}

// Make the post textarea editable and in focus as well as change the button from update to submit 
const updatePostHandler = async () => {
  event.preventDefault();
  const textArea = document.querySelector('textarea');
  textArea.disabled = false;
  textArea.focus();
  updateButton.textContent = "Submit";
  const blogPost_id = updateButton.getAttribute('data-id2');
  updateButton.addEventListener('click', async () => {
    const description = textArea.value.trim();
    const response = await fetch(`/api/blogPosts/${blogPost_id}`, {
      method: 'PUT',
      body: JSON.stringify({ description }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Response:', response); // Debugging
    if (response.ok) {
      // If successful, reload
      document.location.reload();
    } else {
      alert(response.statusText);
    }

  });
  


  
}

// Deleting a comment
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id2')) {
    const id = event.target.getAttribute('data-id2');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete Comment!');
    }
  }
};





inputButton.addEventListener('click', handleComment);
window.addEventListener('load', renderButtons);