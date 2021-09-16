const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, lowercase: true },
    cost: { type: mongoose.Decimal128 },
    date: { type: Date, default: Date.now },
    categories: [String],
    shop: { type: String }
});
const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;