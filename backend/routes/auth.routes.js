// backend/routes/auth.routes.js
const express = require('express');
const { signupPatientHandler } = require('../controllers/auth.controller');
const {signupDoctorHandler} =require("../controllers/auth.controller");
const { loginHandler } = require('../controllers/auth.controller')
const {uploadMiddleware} = require('../services/auth.service')
const router = express.Router();

router.post('/signup/patient', signupPatientHandler);
router.post('/signup/doctor', uploadMiddleware, signupDoctorHandler);
router.post('/login', loginHandler);

module.exports = router;