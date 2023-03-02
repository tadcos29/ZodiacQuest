const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameDataRoutes = require('./gameDataRoutes');

router.use('/users', userRoutes);
router.use('/gamedata', gameDataRoutes);

module.exports = router;
