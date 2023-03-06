async function displayFriendRequests() {
  const email = localStorage.getItem('email');
  const response = await fetch(`/api/friendRequests/accepted/${email}`);
  const data = await response.json();

  const response2 = await fetch(`/api/friendRequests2/accepted/${email}`);
  const data2 = await response2.json();

  $('#friend-list2').empty();
  const addedFriends = [];

  if (data.acceptedRequests1.length == 0 && data2.acceptedRequests2.length == 0) {
    $('#friend-list2').append('<p>No friends</p>');
  } else {
    let counter = 1;
    for (const request of data.acceptedRequests1) {
      const userResponse = await fetch(`/api/user/${request.senderEmail}`);
      const userData = await userResponse.json();

      const achievementResponse = await fetch(`/api/achievement/${userData.id}`);
      const achievementData = await achievementResponse.json();

      if (!addedFriends.includes(userData.name)) {
        const requestDiv = $(`
          <tr id="friendInfo${counter}" value="${userData.id}" class="friendInfo4Redirect">
            <td> ${userData.name} </td>
            <td> ${achievementData.hs} </td>
            <td id="createdAt"> ${request.createdAt} </td>
            <<td> <button class="btn btn-danger" id="viewFriendProfileButton" value="${userData.id}"> View Friend </button> </td>
            <<td> <button class="btn btn-danger" id="removeFriend" value="${request.senderEmail}"> Remove Friend </button> </td>
          </tr>
        `);
        $('#friend-list2').append(requestDiv);
        addedFriends.push(userData.name);
        counter++ 
      }
    }
    let counter2 = 1;
    for (const request of data2.acceptedRequests2) {
      const userResponse = await fetch(`/api/user/${request.receiverEmail}`);
      const userData = await userResponse.json();

      const achievementResponse = await fetch(`/api/achievement/${userData.id}`);
      const achievementData = await achievementResponse.json();

      if (!addedFriends.includes(userData.name)) {
        const requestDiv = $(`
          <tr id="friendInfo2${counter2}" value="${userData.id}" class="friendInfo4Redirect">
            <td> ${userData.name} </td>
            <td> ${achievementData.hs} </td>
            <td id="createdAt"> ${request.createdAt} </td>
            <<td> <button class="btn btn-danger" id="viewFriendProfileButton" value="${userData.id}"> View Friend </button> </td>
            <<td> <button class="btn btn-danger" id="removeFriend" value="${request.receiverEmail}"> Remove Friend </button> </td>
          </tr>
        `);
        $('#friend-list2').append(requestDiv);
        addedFriends.push(userData.name); 
        counter++ 
      }
    }
    for (i=0; i < addedFriends.length + 1 ; i++) {
      $(`#friendInfo${i}:first`).hide();
      $(`#friendInfo2${i}:first`).hide();
    }}}


$('body').on('click', '#removeFriend', async function(event) {
      const friendEmail = event.target.value;
      const email = localStorage.getItem('email');
      try {
        const response = await fetch(`/api/friendRequests/${email}/${friendEmail}/reject`, { 
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.ok) {
          const data = await response.json();
        } else {
          throw new Error('Failed to reject friend request');
        }
      } catch (err) {
        console.error(err);
      }
      window.location.reload();
    });
  

$('body').on('click', '#viewFriendProfileButton', async function(event) {
       const friendID = event.target.value;
       window.location.href = `/profile/${friendID}`;})


displayFriendRequests()
$('#viewFriends').on('click', () => {displayFriendRequests();});