const router = require('express').Router();
const blogRoutes = require('./blog-route');
const userRoutes = require('./user-route');

router.use('/blog', blogRoutes);
router.use('/user', userRoutes);
router.use('/user/login', userRoutes);
router.use('/user/signup', userRoutes);


module.exports = router;