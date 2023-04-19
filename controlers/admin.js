const Product = require('../models/product');

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

module.exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product) => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                product: product,
            });
        })
};

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                pageTitle: 'Admin Products',
                path: '/admin/products',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        })
}




module.exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        // null: null,
        // req: req.user._id
    });
    product.save()
        .then(result => {
            console.log('Created');
            res.redirect('/');
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
    const product = new Product(title, price, description, imageUrl, prodId);
    product.save()
        .then(result => {
            res.redirect('/');
        })
};

module.exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.deleteById(prodId)
        .then(result => {
            console.log(result);
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};