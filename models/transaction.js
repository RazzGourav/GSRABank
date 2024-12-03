const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
   sender : { type: String  }, 
   receiver : { type: String },  
    amount: { type: Number },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);