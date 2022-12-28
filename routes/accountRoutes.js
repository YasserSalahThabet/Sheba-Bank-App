const express = require('express');
const {
  createAccount,
  getAllAccounts,
  getAccount,
} = require('../controllers/accountController');
const {
  transaction,
  updateBalance,
} = require('../controllers/transactionController');

const router = express.Router();

//get all accounts
router.get('/', getAllAccounts);

//get a single account
router.get('/:id', getAccount);

//create account
router.post('/', createAccount);

//post transaction
router.post('/', transaction);

//update account
router.patch('/:id', updateBalance);

module.exports = router;
