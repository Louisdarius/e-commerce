const Router = require('express').Router();
const productControllers = require('../controllers/product');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

Router.post('/addProduct', auth, admin, productControllers.addProduct);
Router.get('/getAllProducts', productControllers.getAllProducts);
Router.get('/getAProduct/:id', productControllers.getAProduct);
Router.patch(
  '/updateAProduct/:id',
  auth,
  admin,
  productControllers.updateAProduct
);
Router.delete(
  '/deleteAProduct/:id',
  auth,
  admin,
  productControllers.deleteAProduct
);

module.exports = Router;
