const router = require('express').Router();
const { Comment } = require('../../models');


// Create new comment
router.post('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(`/User`)

module.exports = router;
