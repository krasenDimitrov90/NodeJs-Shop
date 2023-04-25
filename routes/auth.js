const path = require('path');

const express = require('express');
const router = express.Router();

const authControler = require('../controlers/auth');

router.get('/login', authControler.getLogin);
router.get('/signup', authControler.getSignup);

router.post('/login', authControler.postLogin);
router.post('/signup', authControler.postSignup);
router.post('/logout', authControler.postLogout);

module.exports = router;