const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1];
  
 const newcommentFormHandler = async (event) => {
    event.preventDefault();
    // event.stopPropagation();
    const content = document.querySelector('#content-newcomment').value.trim();
  
    if (content) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload(); 
      } else {
        alert('Failed to create a comment.');
      }
    }
  };

  async function deletionHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('target');
    console.log(event.target);


  }
  
  document
    .querySelector('.newcomment-form')
    .addEventListener('submit', newcommentFormHandler);

    document
    .querySelector('#friend-partial')
    .addEventListener('click', deletionHandler);
  