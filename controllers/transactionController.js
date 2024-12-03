const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Transfer funds
exports.transferFunds = async (req, res) => {
  try {
      const { sender, receiver, amount } = req.body;
      console.log('Transfer request received:', { sender, receiver, amount });

      // Validate input
      if (!sender || !receiver || !amount || amount <= 0) {
          return res.status(400).json({ message: 'Invalid transfer data' });
      }

      // Fetch sender and receiver from the database
      const senderUser = await User.findOne({ username: sender });
      const receiverUser = await User.findOne({ username: receiver });

      // Check if sender and receiver exist
      if (!senderUser) {
          return res.status(404).json({ message: `Sender ${sender} not found` });
      }
      if (!receiverUser) {
          return res.status(404).json({ message: `Receiver ${receiver} not found` });
      }

      // Check if sender has sufficient balance
      if (senderUser.balance < amount) {
          return res.status(400).json({ message: 'Insufficient balance' });
      }

      // Deduct amount from sender and add to receiver
      senderUser.balance -= amount;
      receiverUser.balance += amount;

      // Save updated user balances
      await senderUser.save();
      await receiverUser.save();

      // Log the transaction
      const transaction = new Transaction({
          fromUser: sender, // Align with your model
          toUser: receiver, // Align with your model
          amount,
          date: new Date(),
      });
      await transaction.save();

      // Respond with success
      res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
      console.error('Error in transferFunds:', error.message);
      res.status(500).json({ message: 'Internal server error' });
  }
};
// Ensure this function is in transactionController.js
exports.getTransactionHistory = async (req, res) => {
  try {
      const { username } = req.query;

      if (!username) {
          return res.status(400).json({ message: 'Username is required' });
      }

      const transactions = await Transaction.find({
          $or: [{ fromUser: username }, { toUser: username }],
      }).sort({ date: -1 });

      res.status(200).json(transactions);
  } catch (error) {
      console.error('Error in getTransactionHistory:', error.message);
      res.status(500).json({ message: 'Internal server error' });
  }
};

