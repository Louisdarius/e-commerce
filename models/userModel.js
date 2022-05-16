require('dotenv').config();
const mongoose = require('mongoose');
jwt = require('jsonwebtoken');
bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is requred'],
      lowercase: true,
      unique: [true, 'A account with this email already exists'],
    },
    phoneNumber: {
      type: String,
    },
    gender: String,

    userImage: String,
    password: {
      type: String,
      required: [true, 'Password is requred'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    coins: {
      type: Number,
      default: 200,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    orders: [
      {
        orderItems: [],
        shippingAddress: {
          address: {
            type: String,
            require: true,
          },
          city: {
            type: String,
            require: true,
          },
          postalCode: {
            type: String,
            require: true,
          },
          country: {
            type: String,
            require: true,
          },
        },
        totalPrice: {
          type: Number,
          required: true,
        },
        paymentMethod: {
          type: String,
          required: true,
        },
        paidAt: {
          type: Date,
          default: Date.now,
        },
        isDelivered: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  this.isModified('password') &&
    (this.password = await bcrypt.hash(this.password, 12));
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateToken = async function () {
  const token = await jwt.sign(
    { _id: this._id.toString() },
    process.env.JWTTOKENSECRET
  );
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.statics.findUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValide = await bcrypt.compare(password, user.password);
  if (!isPasswordValide) {
    throw new Error('Wrong password');
  }
  return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
