const userEmail = localStorage.getItem('email');
console.log(userEmail)

// Send friend request
$('#sendFriendRequest').on('click', async function() {
  
    const senderEmail = localStorage.getItem('email');
    const receiverEmail = $('#receiverEmail').val();

    try {
      const response = await fetch('/api/friendRequests', {
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
    const email = localStorage.getItem('email');
    try {
      const response = await fetch(`/api/friendRequests/pending/${email}`);
      const data = await response.json();
      console.log(data);

      const friendRequestsListContainer = document.getElementById('friend-requests-list-container');
      friendRequestsListContainer.removeAttribute('style');
  
      $('#friend-requests-list').empty();
      if (data.pendingRequests.length === 0) {
        $('#friend-requests-list').append('<p>No pending friend requests</p>');
      } else {
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
      }
    } catch (err) {
      console.error(err);
      alert('Error getting pending friend requests');
    }
  });
  
  // Accept friend request
  $(document).on('click', '.acceptBtn', async function() {
    const id = $(this).data('id');
  
    try {
      const response = await fetch(`/api/friendRequests/${id}/accept`, {
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
      const response = await fetch(`/api/friendRequests/${id}/reject`, {
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


