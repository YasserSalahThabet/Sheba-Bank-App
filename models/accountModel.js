const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    balance: {
      type: Number,
      default: 0,
      required: [false],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Account', accountSchema);
