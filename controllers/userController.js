const { Error } = require('mongoose');
const User = require('../models/userModel');

const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    //Check if a user with the same email exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      res.status(401);
      throw new Error(
        `${email} already exists. Try either a different email or resetting your password`
      );
    }
    const user = new User(req.body);
    await user.save();
    if (user) {
      const token = await user.generateToken();
      res.send({ user, token });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  try {
    // Find user
    const user = await User.findUser(req.body.email, req.body.password);
    if (!user) {
      res.status(401);
      throw new Error('Wrong credentials');
    }

    // Generate a token
    const token = await user.generateToken();
    res.send({ user, token });
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    const { user, token: receivedToken } = req;
    user.tokens = user.tokens.filter((token) => {
      return token.token !== receivedToken;
    });
    await user.save();
    res.json({
      message: `${user.firstName} ${user.lastName}. You have been successfully logged out`,
    });
  } catch (e) {
    next(e);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error('User not found');
    }

    let { firstName, lastName, phoneNumber, email, password } = req.body;

    firstName == '' && (firstName = user.firstName);
    lastName == '' && (lastName = user.lastName);
    phoneNumber == '' && (phoneNumber = user.phoneNumber);
    email == '' && (email = user.email);
    password == '' && (password = user.password);

    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.email = email;
    user.password = password;

    await user.save();
    res.send(user);
  } catch (e) {
    next(e);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { user } = req;

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    await user.remove();
    res.json({ status: 'success', message: 'User has been removed' });
  } catch (e) {
    next(e);
  }
};
const getAUser = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) {
      throw new Error('Cannot find user');
    }
    res.send(user);
  } catch (e) {
    next(e);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user.isAdmin) {
      throw new Error('Access denied');
    }
    const allUsers = await User.find({});
    res.json(allUsers);
    console.log(allUsers);
  } catch (e) {
    next(e);
  }
};
const addToCart = async (req, res, next) => {
  try {
    const user = req.user;

    const { id, qty } = req.body;

    const cartItem = {
      product: id,
      qty: parseInt(qty),
    };
    user.cart.push(cartItem);
    await user.save();
    await user.populate('cart.product');
    res.send(user);
  } catch (e) {
    next(e);
  }
};
const removeFromCart = async (req, res, next) => {
  const user = req.user;
  const { index } = req.body;

  user.cart.splice(index, 1);
  await user.save();
  await user.populate('cart.product');
  res.send(user);
};
const placeOrder = async (req, res, next) => {
  try {
    const {
      user,
      body: { shippingAddress, paymentMethod, totalPrice },
    } = req;

    const order = {
      orderItems: user.cart,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      totalPrice: parseInt(totalPrice),
    };

    user.coins = user.coins - parseInt(totalPrice);
    user.orders.push(order);
    user.cart = [];
    await user.save();
    res.send(user);
  } catch (e) {
    next(e);
  }
};
const completeOrder = async (req, res, next) => {
  try {
    const {
      user,
      body: { index },
    } = req;
    user.orders[index].isDelivered = true;
    await user.save();
    res.send(user);
  } catch (e) {
    next(e);
  }
};
const topUp = async (req, res, next) => {
  try {
    const {
      user,
      body: { amount },
    } = req;
    user.coins = user.coins + parseInt(amount);
    await user.save();
    res.send(user);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerUser,
  login,
  logout,
  updateUser,
  deleteUser,
  getAUser,
  getAllUsers,
  topUp,
  addToCart,
  removeFromCart,
  placeOrder,
  completeOrder,
};
