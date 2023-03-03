

// Send friend request
$('#sendFriendRequest').on('click', async function() {
    const senderEmail = $('#senderEmail').val();
    const receiverEmail = $('#receiverEmail').val();

    try {
      const response = await fetch('/friendRequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ senderEmail, receiverEmail })
      });
  
      const data = await response.json();
      console.log(data);
      alert('Friend request sent!');
    } catch (err) {
      console.error(err);
      alert('Error sending friend request');
    }
  });
  
  // Get pending friend requests
  $('#getPendingRequests').on('click', async function() {
    const email = $('#receiverEmail').val();
  
    try {
      const response = await fetch(`/friend-request/pending/${email}`);
      const data = await response.json();
      console.log(data);
  
      $('#friend-requests-list').empty();
      data.pendingRequests.forEach(request => {
        const requestDiv = $(`
          <div>
            <p>From: ${request.senderEmail})</p>
            <button class="acceptBtn" data-id="${request.id}">Accept</button>
            <button class="rejectBtn" data-id="${request.id}">Reject</button>
          </div>
        `);
        $('#friend-requests-list').append(requestDiv);
      });
    } catch (err) {
      console.error(err);
      alert('Error getting pending friend requests');
    }
  });
  
  // Accept friend request
  $(document).on('click', '.acceptBtn', async function() {
    const id = $(this).data('id');
  
    try {
      const response = await fetch(`/friendRequests/${id}/accept`, {
        method: 'PUT'
      });
  
      const data = await response.json();
      console.log(data);
      alert('Friend request accepted!');
    } catch (err) {
      console.error(err);
      alert('Error accepting friend request');
    }
  });
  
  // Reject friend request
  $(document).on('click', '.rejectBtn', async function() {
    const id = $(this).data('id');
  
    try {
      const response = await fetch(`/friendRequests/${id}/reject`, {
        method: 'PUT'
      });
  
      const data = await response.json();
      console.log(data);
      alert('Friend request rejected!');
    } catch (err) {
      console.error(err);
      alert('Error rejecting friend request');
    }
  });

