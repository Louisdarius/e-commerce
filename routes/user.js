const Router = require('express').Router();
const userControllers = require('../controllers/user');
const auth = require('../middlewares/auth');

Router.post('/register', userControllers.register);
Router.post('/login', userControllers.login);
Router.post('/logout', auth, userControllers.logout);
Router.patch('/updateUser', auth, userControllers.updateUser);
Router.delete('/deleteUser', auth, userControllers.deleteUser);

module.exports = Router;
