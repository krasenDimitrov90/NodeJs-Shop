const Product = require('../models/product');
const Order = require('../models/order');


module.exports.getIndex = (req, res, next) => {
    Product.find() // find is a mongoose method
        .then(products => {
            res.render('shop/index', {
                pageTitle: 'Shop',
                path: '/',
                prods: products,
            });
        })
}

module.exports.getAllProducts = (req, res, next) => {
    Product.find() // find is a mongoose method
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
    Product.findById(productId) // findById is mongoose method that auto converts id to new ObjectId
        .then(product => {
            console.log(product);
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
    req.user.populate('cart.items.productId')
        .then(user => {
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: user.cart.items,
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
    req.user.getOrders()
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Orders',
                path: '/orders',
                orders: orders,
            });
        })
}

module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}

module.exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    req.user.removeFromCart(productId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        })
};

module.exports.postOrder = (req, res, next) => {
    req.user.populate('cart.items.productId')
    .then(user => {
        const products = user.cart.items.map(i => {
            return {
                quantity: i.quantity, product: { ...i.productId._doc }
            }
        })

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products
        });

        return order.save();
    })
    .then(result => req.user.clearCart())
    .then(() => res.redirect('/orders'))
};