const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

const user = userData.get({ plain: true });
    // Pass serialized data and session flag into template
    res.render('home', { 
      // Let the homepage do with this what it will
      user,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    res.render('home', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

const user = userData.get({ plain: true });
    // Pass serialized data and session flag into template
    res.render('profile', { 
      // Let the homepage do with this what it will
      user,
      logged_in: req.session.logged_in 
    });


  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
   //whatever happens when the user tries the login endpoint and is already logged in
   res.redirect('/profile');
  // res.status(200).json('User already logged in');
    return;
  }
   res.render('login');
  //res.status(200).json('Legitimate login attempt');
});

module.exports = router;