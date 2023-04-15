const Product = require('../models/product');

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {
            pageTitle: 'Shop',
            path: '/',
            prods: products,
            hasProducts: products.length
        });
    });
}

module.exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

module.exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};