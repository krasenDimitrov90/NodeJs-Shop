const path = require('path');

const express = require('express');
const router = express.Router();

const authControler = require('../controlers/auth');

router.get('/login', authControler.getLogin);
router.post('/login', authControler.postLogin);
router.post('/logout', authControler.postLogout);

module.exports = router;