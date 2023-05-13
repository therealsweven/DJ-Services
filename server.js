const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const routes = require("./controllers");
const sequelize = require("./config/config");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESH,
  cookie: {
    maxAge: 3 * 24 * 60 * 60 * 1000, //3 days
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));
app.use(cookieParser());

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.get("/*", (req, res) => {
  res.render("404");
  //res.send("hello world testing");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
