const router = require('express').Router();
const Blog = require('../../models/Blog');

// route to get all blog posts
router.get('/', async (req, res) => {
    const blogData = await Blog.findAll().catch((err) => {
      res.json(err);
    });
    res.json(blogData);
  });

  // route to create/add a blog post using async/await
router.post('/', async (req, res) => {
  try { 
    const blogData = await Blog.create({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
    });
  // if the blog post is successfully created, the new response will be returned as json
  res.status(200).json(blogData)
} catch (err) {
  res.status(400).json(err);
}
});

module.exports = router;