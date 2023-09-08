const router = require('express').Router();
const blogRoutes = require('./blog-route');

router.use('/blog', blogRoutes);


module.exports = router;