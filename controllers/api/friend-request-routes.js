const express = require('express');
const router = express.Router();
const FriendRequest = require('../../models/friendRequest');
const User = require('../../models/user');

// Send a friend request

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

router.get('/friendRequests/pending/:email', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.params.email } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const pendingRequests = await FriendRequest.findAll({
      where: { receiverEmail: user.email, status: 'pending' },
      include: [{ model: User, as: 'sender', attributes: ['name', 'email'] }]
    });

    return res.status(200).send({ pendingRequests });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server error' });
  }
});

router.get('/friend-request/accepted/:email', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.params.email } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const pendingRequests = await FriendRequest.findAll({
      where: { receiverEmail: user.email, status: 'pending' },
      include: [{ model: User, as: 'sender', attributes: ['name', 'email'] }]
    });

    return res.status(200).send({ pendingRequests });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server error' });
  }
});

// Accept a friend request
router.put('/friendRequests/:id/accept', async (req, res) => {
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

// Reject a friend request
router.put('/friendRequests/:id/reject', async (req, res) => {
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

module.exports = router;