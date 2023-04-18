const Product = require('../models/product');
const Cart = require('../models/cart');


module.exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/index', {
                pageTitle: 'Shop',
                path: '/',
                prods: products,
            });
        })
}

module.exports.getAllProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/products-list', {
                pageTitle: 'All Products',
                path: '/products',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            res.render('shop/product-details', {
                product: product,
                path: '/products',
                pageTitle: product.title
            });
        })
        .catch(err => {
            console.log(err);
        })
};


module.exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(products => {
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: products,
            });
        })

}

module.exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
};

module.exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
    });
}

module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}

module.exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    req.user.deleteItemFromCart(productId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        })
};

module.exports.postOrder = (req, res, next) => {
    req.user.addOrder()
        .then(result => {
            redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        })
};