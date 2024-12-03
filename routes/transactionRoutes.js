const express = require('express');
const { transferFunds, getTransactionHistory } = require('../controllers/transactionController');

const router = express.Router();

router.post('/transfer', transferFunds); // Fund transfer route
router.get('/history', getTransactionHistory); // Transaction history route

module.exports = router;
