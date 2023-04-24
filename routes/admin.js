const path = require('path');
const isAuth = require('../middleWares/is-auth');

const express = require('express');
const router = express.Router();
const adminControler = require('../controlers/admin');


router.get('/add-product', isAuth, adminControler.getAddProduct);
router.get('/edit-product/:productId', isAuth, adminControler.getEditProduct);
router.get('/products', isAuth, adminControler.getProducts);


router.post('/add-product', isAuth, adminControler.postAddProduct);
router.post('/edit-product/:productId', isAuth, adminControler.postEditProduct);
router.post('/delete-product/:productId', isAuth, adminControler.postDeleteProduct);

module.exports = router;
