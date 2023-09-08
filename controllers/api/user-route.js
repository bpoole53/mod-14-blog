const router = require('express').Router();
const User = require('../../models/User');

// route to get all blog posts
router.get('/', async (req, res) => {
    const userData = await User.findAll().catch((err) => {
      res.json(err);
    });
    res.json(userData);
  });

  // route to create/add a blog post using async/await
router.post('/', async (req, res) => {
  try { 
    const userData = await User.create({
        username: req.body.username,
        password: req.body.password,
    });
  // if the blog post is successfully created, the new response will be returned as json
  res.status(200).json(userData)
} catch (err) {
  res.status(400).json(err);
}
});

module.exports = router;