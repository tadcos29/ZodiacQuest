const router = require('express').Router();
const { User, Comment } = require('../../models');
const { Model, DataTypes, QueryTypes } = require('sequelize');

// Create new comment
router.post('/', async (req, res) => {
  try {

    console.log('state'+req.session.state);
    const dbCommentData = await Comment.create({
      content: req.body.content,
      post_id: 0,
      user_id: req.session.user_id,
      recipient_id: req.session.state
    });
    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {

    console.log('state'+req.session.state);
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post('/', async (req, res) => {
//   try {
//     const dbCommentData = await Comment.create({
//       content: req.body.content,
//       post_id: req.body.post_id,
//       user_id: req.session.user_id,
//       recipient_id: req.body.recipient_id
//     });
//     res.status(200).json(dbCommentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;