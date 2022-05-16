const Router = require('express').Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

Router.post('/addProduct', auth, admin, productController.addProduct);
Router.get('/getAllProducts', productController.getAllProducts);
Router.get('/getAProduct/:id', productController.getAProduct);
Router.patch(
  '/updateAProduct/:id',
  auth,
  admin,
  productController.updateAProduct
);

Router.delete(
  '/deleteAProduct/:id',
  auth,
  admin,
  productController.deleteAProduct
);

module.exports = Router;
