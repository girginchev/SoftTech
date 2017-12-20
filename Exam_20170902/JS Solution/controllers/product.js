const Product = require('../models/Product');

module.exports = {
	index: (req, res) => {
        Product.find().then(products=>{
        	res.render('product/index', {'entries':products});
		})
    	},
	createGet: (req, res) => {
        res.render('product/create');
	},
	createPost: (req, res) => {
	let productDetails = req.body;
	Product.create(productDetails).then(product=>{
		res.redirect('/');
	})
	},
	editGet: (req, res) => {
        let productId = req.params.id;
        Product.findById(productId).then(product=>{
        	if(!product){
        		res.redirect('/');
        		return;
			}
			res.render('product/edit', product);
		})
	},
	editPost: (req, res) => {
        let productId = req.params.id;
        let productDetails = req.body;
        Product.findByIdAndUpdate(productId,productDetails).then(product=>{
        	res.redirect('/');
        	return;
		})
	}
};