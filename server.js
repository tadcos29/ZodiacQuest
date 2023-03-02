const path = require('path');
const express = require('express');
// import a session-handling middleware library
const session = require('express-session');
// The foul legacy of Tony Brix, express-handlebars is what gets us our default layout
const exphbs = require('express-handlebars');
// Relegate control to controllers
const routes = require('./controllers');
// find helpers
const helpers = require('./utils/helpers');
// import the pre-configured sequelize (dotenv and all) from connection
const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// express instance
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// Configure how sessions will be created, plug in the SequelizeStore
const sess = {
  secret: 'Secretively onward',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Plug express-session with the configuration passed into the express instance 'app'
app.use(session(sess));
// declare handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// declare middleware utilities
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// allowing the static folder
app.use(express.static(path.join(__dirname, 'public')));
// plugging in the routes from controllers, which have been required into an object, into app
app.use(routes);
// sync database
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});