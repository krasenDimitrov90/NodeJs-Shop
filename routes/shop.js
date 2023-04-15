const path = require('path');

const express = require('express');

const shopControler = require('../controlers/shop');

const router = express.Router();

router.get('/', shopControler.getIndex);

router.get('/products', shopControler.getAllProducts);
router.get('/products/:productId', shopControler.getProduct);
router.get('/cart', shopControler.getCart);
router.post('/cart', shopControler.postCart);
router.get('/orders', shopControler.getOrders);
router.get('/checkout', shopControler.getCheckout);


module.exports = router;
