// backend/routes/auth.routes.js
const express = require('express');
const { signupPatientHandler } = require('../controllers/auth.controller');
const { loginHandler } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup/patient', signupPatientHandler);
router.post('/login', loginHandler);

module.exports = router;