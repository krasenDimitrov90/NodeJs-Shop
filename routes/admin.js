const path = require('path');

const express = require('express');
const router = express.Router();
const productsControler = require('../controlers/products');


// /admin/add-product => GET
router.get('/add-product', productsControler.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsControler.postAddProduct);

module.exports = router;
