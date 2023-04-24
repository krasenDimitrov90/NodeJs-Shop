const path = require('path');
const isAuth = require('../middleWares/is-auth');

const express = require('express');

const shopControler = require('../controlers/shop');

const router = express.Router();

router.get('/', shopControler.getIndex);

router.get('/products', shopControler.getAllProducts);
router.get('/products/:productId', shopControler.getProduct);
router.get('/cart', isAuth, shopControler.getCart);
router.get('/orders', isAuth, shopControler.getOrders);
router.get('/checkout', shopControler.getCheckout);

router.post('/cart', isAuth, shopControler.postCart);
router.post('/cart/delete-item/:productId', isAuth, shopControler.postCartDeleteProduct);
router.post('/create-order', isAuth, shopControler.postOrder);

module.exports = router;
