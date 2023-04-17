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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            if (cart) {
                console.log({cart});
                allIds = cart.products.map(p => p.id);
                products.reduce((acc, p) => {
                    if (allIds.includes(p.id)) {
                        const qty = cart.products.find(prod => prod.id === p.id).qty;
                        acc.push({ productData: p, qty: qty });
                    }
                    return acc
                }, cartProducts);
            }

            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: cartProducts,
            });
        });
    });

}

module.exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    console.log({ productId });

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

module.exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findProduct(productId, (product) => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart');
    });
};