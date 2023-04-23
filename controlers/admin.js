const Product = require('../models/product');

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        isAuthenticated: req.isAuthenticated,
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
                isAuthenticated: req.isAuthenticated,
            });
        })
};

module.exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('admin/products', {
                pageTitle: 'Admin Products',
                path: '/admin/products',
                prods: products,
                isAuthenticated: req.isAuthenticated,
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
        userId: req.user._id
    });
    product.save() // save comes from mongoose
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
    // const product = new Product(title, price, description, imageUrl, prodId);
    Product.findById(prodId) // findById is method from mongoose
        .then(p => {
            p.title = title;
            p.imageUrl = imageUrl;
            p.description = description;
            p.price = price;
            p.userId = req.user._id;
            
            return p.save(); // save is method from mongoose
        })
        .then(result => {
            res.redirect('/');
        })
};

module.exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByIdAndRemove(prodId)
        .then(result => {
            console.log(result);
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};