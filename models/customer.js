const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

// customerSchema.post('save', function (next) {
//     const docSaved = this
//     console.log(docSaved)
//     next();
// });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;