const path = require('path');

const express = require('express');
const router = express.Router();
const adminControler = require('../controlers/admin');


router.get('/add-product', adminControler.getAddProduct);
router.get('/edit-product/:productId', adminControler.getEditProduct);
router.get('/products', adminControler.getProducts);


router.post('/add-product', adminControler.postAddProduct);
router.post('/edit-product/:productId', adminControler.postEditProduct);

module.exports = router;
