require('dotenv').config();
const express = require('express'),
      session = require('express-session'),
      checkForSession = require('./middlewares/checkForSession'), 
      swagCtrl = require('./controllers/swagController'),
      authCtrl = require('./controllers/authController'),
      cartCtrl = require('./controllers/cartController'),
      searchCtrl = require('./controllers/searchController'),
      {SERVER_PORT, SESSION_SECRET} = process.env,
      app = express();

// MIDDLEWARE
app.use(express.json());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

// SWAG ENDPOINT
app.get('/api/swag', swagCtrl.getSwag);

// USER AUTH ENDPOINTS
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.get('/api/user', authCtrl.getUser);

// CART ENDPOINTS
app.post('/api/cart/checkout', cartCtrl.checkout);
app.post('/api/cart/:id', cartCtrl.add);
app.delete('/api/cart/:id', cartCtrl.delete);

//SEARCH ENDPOINT
app.get('/api/search', searchCtrl.search);

const port = SERVER_PORT;
app.listen(port, () => console.log(`Server listening on port: ${port}`));