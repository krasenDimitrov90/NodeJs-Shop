const Product = require('../models/product');

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

module.exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findProduct(prodId, (product) => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            product: product,
        });
    });
};

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            pageTitle: 'Admin Products',
            path: '/admin/products',
            prods: products,
        });
    });
}




module.exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(title, price, description, imageUrl);
    product.save()
        .then(result => {
            console.log('Created');
            res.redirect('/admin/add-product');
        })
        .catch(err => {
            console.log(err);
        })

};

module.exports.postEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(prodId, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

module.exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};