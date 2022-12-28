const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');
const mongoose = require('mongoose');

//post deposit/widthdraw money to the database
const transaction = async (req, res) => {
  const { transactionType, amount } = req.body;

  //posts transaction to the database

  try {
    console.log('Paased this point!!');
    const transaction = await Transaction.create({ transactionType, amount });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//updates balance
const updateBalance = async (req, res) => {
  const { id } = req.params;
  const { transactionType, amount } = req.body;

  //checks is provide id is a valid mongoose id to avoid server crash.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Account does not exist' });
  }

  //get account balance
  const account = await Account.findById(id);
  const balance = account.balance;

  //check transaction type and update balance
  let updatedBalance;

  if (transactionType === 'deposit') {
    updatedBalance = balance + amount;
  }

  if (transactionType === 'withdrawal') {
    if (amount > balance) {
      return res.status(400).json({
        error: `You cannot withdraw the required amount because your account balance is ${balance}`,
      });
    }
    updatedBalance = balance - amount;
  }

  const updatedAccount = await Account.findByIdAndUpdate(
    { _id: id },
    { $set: { balance: updatedBalance } },
    { new: true }
  );

  //checks if account exists
  if (!updatedAccount) {
    return res.status(404).json({ error: 'Account does not exist' });
  }

  res.status(200).json(updatedAccount);
};

module.exports = {
  transaction,
  updateBalance,
};
