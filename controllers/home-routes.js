const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('home');
});

router.get('/blog', async (req, res) => {
    res.render('blog');
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.get('/login', async (req, res) => {
    res.render('signup');
});

module.exports = router;