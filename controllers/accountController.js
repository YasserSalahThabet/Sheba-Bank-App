const Account = require('../models/accountModel');
const mongoose = require('mongoose');

//create new account
const createAccount = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const account = await Account.create({ name, email, password });
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all accounts
const getAllAccounts = async (req, res) => {
  const accounts = await Account.find({}).sort({ createdAt: -1 });
  res.status(200).json(accounts);
};

//get single accounts
const getAccount = async (req, res) => {
  const { id } = req.params;

  //checks is provide id is a valid mongoose id to avoid server crash.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Account does not exist' });
  }

  const account = await Account.findById(id);

  if (!account) {
    return res.status(404).json({ error: 'Account does not exist' });
  }

  res.status(200).json(account);
};

module.exports = { createAccount, getAllAccounts, getAccount };
