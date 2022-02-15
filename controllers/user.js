const User = require('../models/user');

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, isAdmin } = req.body;

    //Check if a user with the same email exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      res.status(401);
      throw new Error(`${email} already exists. Try a different email`);
    }
    const user = new User({ firstName, lastName, email, password, isAdmin });
    if (isAdmin) {
      res.status(401);
      throw new Error('Cannot register as an admin');
    }
    await user.save();

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: await user.generateToken(),
      });
    } else {
      res.status(400);
      throw new Error('Invalid data');
    }
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);
    if (!user) {
      res.status(401);
      throw new Error('Wrong credentials');
    }
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: await user.generateToken(),
    });
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
  const user = req.user;
  let { firstName, lastName, email, password } = req.body;

  firstName == '' && (firstName = user.firstName);
  lastName == '' && (lastName = user.lastName);
  email == '' && (email = user.email);
  password == '' && (password = user.password);

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = password;

  try {
    await user.save();
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res) => {
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
module.exports = {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
};
