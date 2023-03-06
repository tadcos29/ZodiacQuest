async function displayFriendRequests() {
  const email = localStorage.getItem('email');
  const response = await fetch(`/api/friendRequests/accepted/${email}`);
  const data = await response.json();
  console.log(data);

  const response2 = await fetch(`/api/friendRequests2/accepted/${email}`);
  const data2 = await response2.json();
  console.log(data2);

  $('#friend-list2').empty();
  const addedFriends = [];

  if (data.acceptedRequests1.length == 0 && data2.acceptedRequests2.length == 0) {
    $('#friend-list2').append('<p>No friends</p>');
  } else {
    let counter = 1;
    for (const request of data.acceptedRequests1) {
      const userResponse = await fetch(`/api/user/${request.senderEmail}`);
      const userData = await userResponse.json();
      console.log(userData);
      console.log(userData.name);

      const achievementResponse = await fetch(`/api/achievement/${userData.id}`);
      const achievementData = await achievementResponse.json();
      console.log(achievementData);

      if (!addedFriends.includes(userData.name)) {
        const requestDiv = $(`
          <tr id="friendInfo${counter}" value="${userData.id}" class="friendInfo4Redirect">
            <td> ${userData.name} </td>
            <td> ${achievementData.hs} </td>
            <td> ${request.createdAt} </td>
            <<td> <button class="btn btn-danger" id="removeFriend" value="${request.senderEmail}"> Remove Friend </button> </td>
            <<td> <button class="btn btn-danger" id="viewFriendProfileButton" value="${userData.id}"> View Friend </button> </td>
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
      console.log(userData);

      const achievementResponse = await fetch(`/api/achievement/${userData.id}`);
      const achievementData = await achievementResponse.json();
      console.log(achievementData);

      if (!addedFriends.includes(userData.name)) {
        const requestDiv = $(`
          <tr id="friendInfo2${counter2}" value="${userData.id}" class="friendInfo4Redirect">
            <td value="${request.receiverEmail}" id="friendName"> ${userData.name} </td>
            <td> ${userData.name} </td>
            <td> ${achievementData.hs} </td>
            <td> ${request.createdAt} </td>
            <<td> <button class="btn btn-danger" id="removeFriend" value="${request.receiverEmail}"> Remove Friend </button> </td>
            <<td> <button class="btn btn-danger" id="viewFriendProfileButton" value="${userData.id}"> View Friend </button> </td>
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
      console.log(i)
    }
  }
  console.log(addedFriends)
}


$('body').on('click', '#removeFriend', async function(event) {
      const friendEmail = event.target.value;
      console.log(friendEmail)
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
          console.log(data);
        } else {
          throw new Error('Failed to reject friend request');
        }
      } catch (error) {
        console.error(error);
      }
    });
  

$('body').on('click', '#viewFriendProfileButton', async function(event) {
       const friendID = event.target.value;
       console.log(friendID)
       window.location.href = `/profile/${friendID}`;})


  //     const userResponse = await fetch(`/api/user/${friendEmail}`);
  //     const userData = await userResponse.json();
  //     console.log(userData);

  //     const achievementResponse = await fetch(`/api/achievement/${userData.id}`);
  //     const achievementData = await achievementResponse.json();
  //     console.log(achievementData);

  //     const gameData = await fetch(`/api/game_data/${userData.id}`);
  //     const gameDataData = await gameData.json();
  //     console.log(gameDataData);

  //     const requestDiv = $(`
  //     <div class="col-5 d-flex justify-content-center mx-2">
  //     <div id="boxes2" class="profile-box mx-auto w-100 pr-10 pl-10 mt-10">
  //     <h1 class=" text-center p-4 text-white"> {{userData.name}}</h1>
  //     <div class="row w-100 justify-content-around align-content-around">
  //       <div id="card-body" class="card d-flex my-10 col-4">
  //       <div class="card-body">
  //         <h5 class="card-title text-white text-center">Highscore</h5>
  //         <p class="card-text text-white text-center"> {{achievementData.hs}} </p>
  //       </div>
  //     </div>
  //      <div  id="card-body" class="card d-flex my-10  col-4">
  //       <div class="card-body">
  //         <h5 class="card-title text-white text-center">Times Played</h5>
  //         <p class="card-text text-white text-center"> {{gameDataData.played_count}} </p>
  //       </div>
  //     </div>
  //     </div>
  //     <div class="row w-100 justify-content-around">
      
  //      <div id="card-body" class="card d-flex my-10  col-4">
  //       <div class="card-body">
  //         <h5 class="card-title text-white text-center ">Coins</h5>
  //         <p class="card-text text-white text-center"> {{achievementData.currency}} </p>
  //       </div>
  //     </div>
  //      <div id="card-body" class="card d-flex my-10  col-4">
  //       <div class="card-body">
  //         <h5 class="card-title text-white text-center">Current Skin</h5>
  //         <p class="card-text text-white text-center"> {{achievementData.skin}} </p>
  //       </div>
  //     </div>
  //     </div>
  //     </div>
  //     </div>
  //   `);
  //   $('#friendProfileInfo').append(requestDiv);
  // })

displayFriendRequests()
$('#viewFriends').on('click', () => {displayFriendRequests();});