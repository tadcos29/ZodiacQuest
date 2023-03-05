const { Comment } = require('../models');

const commentdata = [
  {
    content: 'Comment 1',
    post_id: 1,
    user_id: 1,
    recipient_id: 1,
  },
  {
    content: 'Comment 2',
    post_id: 1,
    user_id: 2,
    recipient_id: 2,
  },
  {
    content: 'Comment 3',
    post_id: 2,
    user_id: 1,
    recipient_id: 2,
  },
  {
    content: 'Comment 4',
    post_id: 3,
    user_id: 1,
    recipient_id: 2,
  },
  {
    content: 'Comment 5',
    post_id: 3,
    user_id: 1,
    recipient_id: 2,
  },
  {
    content: 'Comment 6',
    post_id: 4,
    user_id: 1,
    recipient_id: 2,
  },
  {
    content: 'Comment 7',
    post_id: 4,
    user_id: 1,
    recipient_id: 2,
  },
  {
    content: 'Comment 8',
    post_id: 4,
    user_id: 2,
    recipient_id: 1,
  },
  {
    content: 'Comment 9',
    post_id: 2,
    user_id: 3,
    recipient_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;