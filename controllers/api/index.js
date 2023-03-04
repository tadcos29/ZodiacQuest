const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameDataRoutes = require('./gameDataRoutes');
const friendRoutes = require('./friend-request-routes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/gamedata', gameDataRoutes);
router.use('/', friendRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
