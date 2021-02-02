const express = require('express');
const bodyParser = require('body-parser');

const authorizationRouter = require('./resources/authorization/authorization.router');
weatherRouter = require('./resources/weather/weather.router');

const checkToken = require('./resources/authorization/checkToken');

const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 80;

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('main');
});

app.use('/about', (req, res) => {
  res.render('about');
});
app.use('/authorization', authorizationRouter);
app.use('/', checkToken);

app.use('/weather', weatherRouter);

app.get('/logout', (req, res, next) => {
  res.clearCookie('token');
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log('SERVER HAS BEEN STARTED');
})
