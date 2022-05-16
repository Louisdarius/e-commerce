const Product = require('../models/product');

const addProduct = async (req, res, next) => {
  try {
    const {
      user,
      body: { name, image, brand, category, description, price, countInStock },
    } = req;

    const product = new Product({
      user: user._id,
      name: name,
      image: image,
      brand: brand,
      category: category,
      description: description,
      price: price,
      countInStock: countInStock,
    });
    await product.save();
    res.send(product);
  } catch (e) {
    next(e);
  }
};
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    next(e);
  }
};
const getAProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (e) {
    next(e);
  }
};
const updateAProduct = async (req, res, next) => {
  try {
    let {
      user,
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    } = req.body;

    const product = await Product.findById(req.params.id);

    console.log('Old product');
    console.log(product);

    if (product) {
      // If any req.body property is not sent, we reassign to that property the old one.
      (!user || user == '') && (user = product.user);
      (!name || name == '') && (name = product.name);
      (!image || image == '') && (image = product.image);
      (!brand || brand == '') && (brand = product.brand);
      (!category || category == '') && (category = product.category);
      (!description || description == '') &&
        (description = product.description);
      (!price || price == '') && (price = product.price);
      (!countInStock || countInStock == '') &&
        (countInStock = product.countInStock);

      product.user = user;
      product.name = name;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.description = description;
      product.price = price;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();

      console.log('New Product');
      console.log(updatedProduct);
      res.json(updatedProduct);
    }
  } catch (e) {
    next(e);
  }
};
const deleteAProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ Message: 'Product was deleted successfuly' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getAProduct,
  updateAProduct,
  deleteAProduct,
};
