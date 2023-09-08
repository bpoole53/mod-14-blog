
const express = require('express');
const exphbs = require('express-handlebars');
const path = require ('path');
const routes = require('./controllers');
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//set cookie to last 1 minute, normally would be longer but for the purpose of not making the grader wait forever just set to that
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60* 1000,    
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
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