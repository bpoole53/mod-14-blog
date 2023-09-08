const router = require('express').Router();
const Blog = require('../models/Blog')
const User = require('../models/User')

router.get('/', async (req, res) => {
    const blogData = await Blog.findAll().catch((err) => { 
        res.json(err);
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));   
    res.render('home', { blogs });
    });


router.get('/blog', async (req, res) => {
    res.render('blog');
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.get('/login', async (req, res) => {
    res.render('login');
});

module.exports = router;