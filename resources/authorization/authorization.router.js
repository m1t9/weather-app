const router = require('express').Router();
const loginService = require('./authorization.service');

router.get('/', (req, res, next) => {
  if (req.cookies.token) {
    res.render('hello', { message: `Hello, ${req.cookies.login}!` });
  } else {
    res.render('authorization', { log: false });
  }
});

router.post('/signup', async (req, res,) => {
  const { name, email, login, password } = req.body;
  const token = await loginService.signup(name, email, login, password);
  if (token) {
    res.cookie('token', token, { maxAge: 900000, httpOnly: true });
    res.cookie('login', login, { maxAge: 900000, httpOnly: true });
    res.status(200).render('hello', { message: `Hello, ${login}!`});
  } else {
    res.status(401).render('hello', { message: `Current user exists!`});
  }
});

router.post('/login', async (req, res, next) => {
  const { login, password } = req.body;
  const token = await loginService.login(login, password);
  
  if (token) {
    res.cookie('token', token, { maxAge: 900000, httpOnly: true });
    res.cookie('login', login, { maxAge: 900000, httpOnly: true });
    res.status(200).render('hello', { message: `Hello, ${login}!`});
    
  } else {
    res.status(401).render('hello', { message: `Wrong login/password!`});
  }
});

module.exports = router;