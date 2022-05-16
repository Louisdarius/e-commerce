const Router = require('express').Router();
const userControllers = require('../controllers/userController');
const admin = require('../middlewares/admin');
const auth = require('../middlewares/auth');

Router.post('/register', userControllers.registerUser);
Router.post('/login', userControllers.login);
Router.post('/logout', auth, userControllers.logout);
Router.patch('/updateUser', auth, userControllers.updateUser);
Router.delete('/deleteUser', auth, userControllers.deleteUser);
Router.get('/', auth, userControllers.getAUser);
Router.get('/allUsers', auth, admin, userControllers.getAllUsers);
Router.post('/topUp', auth, userControllers.topUp);
Router.post('/addToCart', auth, userControllers.addToCart);
Router.post('/removeFromCart', auth, userControllers.removeFromCart);
Router.post('/placeOrder', auth, userControllers.placeOrder);
Router.post('/completeOrder', auth, userControllers.completeOrder);

module.exports = Router;
