require('dotenv').config();
const os = require('os');
const User = require('../models/user');

const isDeviceApproved = async (req, res, next) => {
  const { en0 } = os.networkInterfaces();
  const isDeviceApproved = en0[1].address == process.env.IP;
  req.isDeviceApproved = isDeviceApproved;
  next();
};

module.exports = isDeviceApproved;
