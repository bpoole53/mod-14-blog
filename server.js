
const express = require('express');
const exphbs = require('express-handlebars');
const path = require ('path');
const routes = require('./controllers');
const session = require('express-session');
const sequelize = require('./config/connection');

const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
};

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => console.log('Now listening on: http://localhost:' + PORT));
});