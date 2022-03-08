const Router = require('express').Router();
const userControllers = require('../controllers/user');
const auth = require('../middlewares/auth');
const isDeviceApproved = require('../middlewares/approvedDevice');

Router.post('/register', isDeviceApproved, userControllers.register);
Router.post('/login', userControllers.login);
Router.post('/logout', auth, userControllers.logout);
Router.patch('/updateUser', auth, userControllers.updateUser);
Router.delete('/deleteUser', auth, userControllers.deleteUser);
Router.get('/allUsers', auth, userControllers.getAllUsers);

module.exports = Router;
