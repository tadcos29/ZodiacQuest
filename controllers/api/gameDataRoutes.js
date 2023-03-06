const router = require('express').Router();
const { GameData, Achievement } = require('../../models');
const withAuth = require('../../utils/auth');


router.put('/skin', withAuth, async (req,res) => {
    try {
      currAchieve = await Achievement.findOne({ where: { user_id: req.session.user_id } })
      console.log(req.body.image);
      let imageString = req.body.image.split('/');
      let imageName = imageString.pop();
      console.log('in fetch'+imageName);
      res.status(200).json(currAchieve);
    } catch (err) {
      res.status(500).json(err);
    }

});


router.get('/skin', withAuth, async (req,res) => {
  try {
    currAchieve = await Achievement.findOne({ where: { user_id: req.session.user_id } });
    plainAchieve=currAchieve.get({ plain: true });
    console.log('skin in get');
    console.log(plainAchieve.skin);
    console.log('that was skin in get');
    res.status(200).json(plainAchieve);
  } catch (err) {
    console.log(err);
  }

});


router.post('/', withAuth, async (req, res) => {
  try {

   let rBody=req.body;
   rBody.user_id=req.session.user_id;
    const gameData = await GameData.create(rBody);
    currAchieve = await Achievement.findOne({ where: { user_id: gameData.user_id } })
    console.log('current-achieve');
    console.log(currAchieve);
    console.log('currency');
    console.log(currAchieve.currency);
    if (gameData.score > currAchieve.hs) {
      await Achievement.update({ hs: gameData.score }, {where:  { user_id: gameData.user_id }});
    }
  //  userData.get({ plain: true });

    newCurr=currAchieve.currency+rBody.currency;
    console.log('currency update: '+newCurr);
    await Achievement.update({ currency:newCurr }, {where:  { user_id: gameData.user_id }});
    res.status(200).json(gameData);
    }
   catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
});


module.exports = router;
