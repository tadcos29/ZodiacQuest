const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameDataRoutes = require('./gameDataRoutes');
const friendRoutes = require('./friend-request-routes');


router.use('/users', userRoutes);
router.use('/gamedata', gameDataRoutes);
router.use('/', friendRoutes);


module.exports = router;
