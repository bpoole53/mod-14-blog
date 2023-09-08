const express = require('express');
const exphbs = require('express-handlebars');
const path = require ('path');
const routes = require('./controllers');

const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/home-routes'));

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
  });
  