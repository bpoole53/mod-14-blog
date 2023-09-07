async function newFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#blog_title').value;
    const description = document.querySelector('#blog_description').value;

    const response = await fetch(`/api/blog`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add blog post');
    }
  }
  
  document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);