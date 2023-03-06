const express = require('express');
const router = express.Router();
const FriendRequest = require('../../models/friendRequest');
const User = require('../../models/User');
const Achievement = require('../../models/Achievement');
const GameData = require('../../models/Achievement');


router.post('/friendRequests', async (req, res) => {
  try {
    const friendRequest = await FriendRequest.create({
      senderEmail:req.body.senderEmail,
      receiverEmail: req.body.receiverEmail,
      status: 'pending'
    });

    res.json(friendRequest);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/friendRequests/pending/:receiverEmail', async (req, res) => {
  try {
    const pendingRequests = await FriendRequest.findAll({
      where: { 
        receiverEmail: req.params.receiverEmail, 
        status: 'pending' 
      }});

    return res.status(200).send({ pendingRequests });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
});


router.get('/friendRequests/accepted/:email', async (req, res) => {
  try {
    const acceptedRequests1 = await FriendRequest.findAll({
      where: {
        status: 'accepted',
        receiverEmail: req.params.email, 
      } });

    return res.status(200).send({ acceptedRequests1 });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
});

router.get('/friendRequests2/accepted/:email', async (req, res) => {
  try {
    const acceptedRequests2 = await FriendRequest.findAll({
      where: {
        status: 'accepted',
        senderEmail: req.params.email, 
      } });

    return res.status(200).send({ acceptedRequests2 });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
});

router.put('/friendRequests/:id/accepted', async (req, res) => {
  try {
    const { id } = req.params;
    const friendRequest = await FriendRequest.findByPk(id);
    friendRequest.status = 'accepted';
    await friendRequest.save();

    res.json(friendRequest);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.put('/friendRequests/:id/rejected', async (req, res) => {
  try {
    const { id } = req.params;
    const friendRequest = await FriendRequest.findByPk(id);
    friendRequest.status = 'rejected';
    await friendRequest.save();

    res.json(friendRequest);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.params.email }
    });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/achievement/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findOne({
      where: { user_id: req.params.id }
    });
    if (!achievement) {
      return res.status(404).send('User not found');
    }
    res.send(achievement);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/game_data/:id', async (req, res) => {
  try {
    const gameData = await GameData.findOne({
      where: { user_id: req.params.id }
    });
    if (!achievement) {
      return res.status(404).send('User not found');
    }
    res.send(gameData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.put('/friendRequests/:senderEmail/:receiverEmail/reject', async (req, res) => {
  try {
    const request = await FriendRequest.findOne({
      where: {
        senderEmail: [req.params.senderEmail, req.params.receiverEmail],
        receiverEmail: [req.params.senderEmail, req.params.receiverEmail], 
        status: 'accepted'
      }
    });

    if (request === null) {
      throw new Error('No accepted friend request found');
    }

    request.status = 'rejected';
    await request.save();

    return res.status(200).json({ message: 'Friend request rejected', request });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/user/id/:id', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id }
    });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
module.exports = router;
