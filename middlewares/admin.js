require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const admin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(404);
      throw new Error('Sorry this action is limited to Admin only');
    }
  } catch (e) {
    next(e);
  }
};
module.exports = admin;
