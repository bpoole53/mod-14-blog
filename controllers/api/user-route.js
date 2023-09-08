const router = require('express').Router();
const User = require('../../models/User');

// route to get all user data
router.get('/', async (req, res) => {
    const userData = await User.findAll().catch((err) => {
      res.json(err);
    });
    res.json(userData);
  });

  // route to create/add a new user
router.post('/signup', async (req, res) => {
  try { 
    const userData = await User.create({
        username: req.body.username,
        password: req.body.password,
    });
    
    //save session and set logged in to true

    req.session.save(() => {
          req.session.loggedIn = true;
          res.status(200).json(userData);
      });
  } catch (err) {
  res.status(400).json(err);
  console.log(err)
  }
});

// let the user login
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Email or password is incorrect. Try again!' });
        return;
      }
  
      const correctPassword = await userData.checkPassword(req.body.password);
  
      if (!correctPassword) {
        res
          .status(400)
          .json({ message: 'Email or password is incorrect. Try again!' });
        return;
      }
  
      // if the user successfully logs in set logged in to true
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res
          .status(200)
          .json({ user: userData, message: 'You have successfullylogged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

//logs the user out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;  