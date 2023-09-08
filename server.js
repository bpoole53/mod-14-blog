
const express = require('express');
const exphbs = require('express-handlebars');
const path = require ('path');
const routes = require('./controllers');
const session = require('express-session');
const sequelize = require('./config/connection');

const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

const sess = {
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
  };
  
app.use(session(sess));

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/home-routes'));

sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => console.log('Now listening on: http://localhost:' + PORT));
});