const router = require('express').Router();
const { GameData, Achievement } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {

   let rBody=req.body;
   rBody.user_id=req.session.user_id;
    const gameData = await GameData.create(rBody);
    currAchieve = await Achievement.findOne({ where: { user_id: gameData.user_id } })
    if (gameData.score > currAchieve.hs) {
      await Achievement.update({ hs: gameData.score }, {where:  { user_id: gameData.user_id }});
    }
    res.status(200).json(gameData);
    }
   catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
});


module.exports = router;
