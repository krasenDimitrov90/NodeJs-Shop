const path = require('path');

const express = require('express');

const productsControler = require('../controlers/products');

const router = express.Router();

router.get('/', productsControler.getProducts);

module.exports = router;
