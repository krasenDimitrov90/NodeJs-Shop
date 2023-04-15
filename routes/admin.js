const path = require('path');

const express = require('express');
const router = express.Router();
const adminControler = require('../controlers/admin');


// /admin/add-product => GET
router.get('/add-product', adminControler.getAddProduct);

// /admin/products => GET
router.get('/products', adminControler.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminControler.postAddProduct);

module.exports = router;
