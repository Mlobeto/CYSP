const express = require('express');
const { forgotPassword, resetPassword, sendMail  } = require('../controllers/index');

const router = express.Router();

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/sendInvitation', sendMail); // Add route for sendMail

module.exports = router;