const express = require('express');
const router = express.Router();

const{
    signup,
    login,
    forgotPassword
} = require('../controllers/authControllers');

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-pass', forgotPassword);

module.exports = router;
