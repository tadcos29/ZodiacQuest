const userEmail = localStorage.getItem('email');

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
      alert('Friend request sent!');
    } catch (err) {
      console.error(err);
      alert('Error sending friend request');
    }
  });
  
  $('#getPendingRequests').on('click', async function() {
    const requestDiv = $(`<thead>
    <tr>
      <th scope="col"> Sender's Email </th>
      <th scope="col">Accept</th>
      <th scope="col">Reject</th>
    </tr>
    <tbody id="friend-requests-list">
    </tbody>`);
  $('#pendingRequests').append(requestDiv);
    const email = localStorage.getItem('email');
    try {
      const response = await fetch(`/api/friendRequests/pending/${email}`);
      const data = await response.json();

      const friendRequestsListContainer = document.getElementById('friend-requests-list-container');
      friendRequestsListContainer.removeAttribute('style');
  
      $('#friend-requests-list').empty();
      if (data.pendingRequests.length === 0) {
        $('#friend-requests-list').append('<p>No pending friend requests</p>');
      } else {
        data.pendingRequests.forEach(request => {
          const requestDiv = $(`
          <tr>
            <td style="color: white;"> ${request.senderEmail} </td>
            <td> <button class="btn btn-success acceptBtn" id="acceptBtn" data-id="${request.id}">Accept</button></td>
            <td> <button class="btn btn-danger rejectBtn" id="rejectBtn" data-id="${request.id}">Reject</button></td>
          </tr>
          `);
          $('#friend-requests-list').append(requestDiv);
        });
      }
    } catch (err) {
      console.error(err);
      alert('Error getting pending friend requests');
    }
  });
  
  $(document).on('click', '.acceptBtn', async function() {
    const id = $(this).data('id');
    try {
      const response = await fetch(`/api/friendRequests/${id}/accepted`, {
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
  
  $(document).on('click', '.rejectBtn', async function() {
    const id = $(this).data('id');
    try {
      const response = await fetch(`/api/friendRequests/${id}/rejected`, {
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


async function displayFriendRequests() {
    const friendID = localStorage.getItem('friendID');

    const friend = await fetch(`/api/user/id/${friendID}`);
    const friendData = await friend.json();
    const email = friendData.email

    const response = await fetch(`/api/friendRequests/accepted/${email}`);
    const data = await response.json();
  
    const response2 = await fetch(`/api/friendRequests2/accepted/${email}`);
    const data2 = await response2.json();
  
    $('#friend-list3').empty();
    const addedFriends = [];
  
    if (data.acceptedRequests1.length == 0 && data2.acceptedRequests2.length == 0) {
      $('#friend-list3').append('<p>No friends</p>');
    } else {
      let counter = 1;
      for (const request of data.acceptedRequests1) {
        const userResponse = await fetch(`/api/user/${request.senderEmail}`);
        const userData = await userResponse.json();
  
        const achievementResponse = await fetch(`/api/achievement/${userData.id}`);
        const achievementData = await achievementResponse.json();
  
        if (!addedFriends.includes(userData.name)) {
          const requestDiv = $(`
            <tr id="friendInfo" value="${userData.id}" class="friendInfo4Redirect">
              <td> ${userData.name} </td>
              <td> ${achievementData.hs} </td>
              <td> ${request.createdAt} </td>
              <<td> <button class="btn btn-danger" id="viewFriendProfileButton" value="${userData.id}"> View Friend </button> </td>
            </tr>
          `);
          $('#friend-list3').append(requestDiv);
          addedFriends.push(userData.name);
          counter++ 
        }
      }
      for (const request of data2.acceptedRequests2) {
        const userResponse = await fetch(`/api/user/${request.receiverEmail}`);
        const userData = await userResponse.json();
  
        const achievementResponse = await fetch(`/api/achievement/${userData.id}`);
        const achievementData = await achievementResponse.json();
  
        if (!addedFriends.includes(userData.name)) {
          const requestDiv = $(`
            <tr id="friendInfo" value="${userData.id}" class="friendInfo4Redirect">
              <td> ${userData.name} </td>
              <td> ${achievementData.hs} </td>
              <td id="createdAt"> ${request.createdAt} </td>
              <<td> <button class="btn btn-danger" id="viewFriendProfileButton" value="${userData.id}"> View Friend </button> </td>
            </tr>
          `);
          $('#friend-list3').append(requestDiv);
          addedFriends.push(userData.name); 
          counter++ 
        }
      }  }  }
  displayFriendRequests()

  $('body').on('click', '#viewFriendProfileButton', async function(event) {
    const friendID = event.target.value;
    localStorage.setItem('friendID', friendID); 
    window.location.href = `/profile/${friendID}`;
    displayFriendRequests()
  })
