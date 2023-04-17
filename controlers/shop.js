const Product = require('../models/product');
const Cart = require('../models/cart');


module.exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            pageTitle: 'Shop',
            path: '/',
            prods: products,
        });
    });
}

module.exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/products-list', {
            pageTitle: 'All Products',
            path: '/products',
            prods: products,
        });
    });
}

module.exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findProduct(productId, product => {
        res.render('shop/product-details', {
            product: product,
            path: '/products',
            pageTitle: product.title
        });
    });
};


module.exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
    });
}

module.exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    console.log({productId});

    Product.findProduct(productId, (product) => {
        Cart.addProduct(productId, product.price);
    });
    res.redirect('/cart');
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

