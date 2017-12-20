const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    priority: {type: Number, required: 'true'},
    name: {type: String, require: 'true'},
    quantity: {type: Number, require: 'true'},
    status: {type: String, required:'true'}
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;