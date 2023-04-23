const path = require('path');

const express = require('express');
const router = express.Router();

const authControler = require('../controlers/auth');

router.get('/login', authControler.getLogin);
router.post('/login', authControler.postLogin);

module.exports = router;