const friends = async () => {
    const email = localStorage.getItem('email');
    const response = await  fetch(`/api/friendRequests/accepted/${email}`);
    const data = await response.json();
    console.log(data);
    
    $('#friend-list').empty();
    if (data.pendingRequests.length === 0) {
      $('#friend-list').append('<p>No friends</p>');
    } else {
      data.pendingRequests.forEach(request => {
        if (request.senderEmail == email) {
        const name =  fetch(`/api/user/${request.receiverEmail}`);
        const data2 = name.json();
        console.log(data2)
        const requestDiv = $(`
          <div>
            <p id="name"> ${data2} </p>
            <p id="receiverEmail">${request.receiverEmail} </p>
            <p id="createdAt"> ${request.createdAt} <p>
            <button id="friendProile"> View Friend </button> 
            <button id="removeFriend"> Remove Friend </button>
          </div>
        `);
        $('#friend-list').append(requestDiv);
      } else {
        const name =  fetch(`/api/user/${request.senderEmail}`);
        const data2 = name.json();
        console.log(data2)
        const requestDiv = $(`
          <div>
            <p id="name"> ${data2} </p>
            <p id="senderEmail">${request.senderEmail} </p>
            <p id="createdAt"> ${request.createdAt} <p>
            <button id="friendProile"> View Friend </button> 
            <button id="removeFriend"> Remove Friend </button>          
          </div>
        `);
        $('#friend-list').append(requestDiv);
      }
    });}}

    $('#removeFriend').on('click', async function() {
        const friendDiv = $(this).closest('div');
        const receiverEmail = friendDiv.find('#receiverEmail').text();
        const senderEmail = friendDiv.find('#senderEmail').text();
        if (!senderEmail) {
        const response = await fetch(`/api/friendRequests/${receiverEmail}/${email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'rejected' })
          });          
            const data = await response.json();
            console.log(data);
 
        } else {
            const response = await fetch(`/api/friendRequests/${senderEmail}/${email}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'rejected' })
              });
              const data = await response.json();
              console.log(data);
        }
    })

