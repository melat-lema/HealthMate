// backend/routes/auth.routes.js
const express = require('express');

const { signupPatientHandler } = require('../controllers/auth.controller');
const {signupDoctorHandler} =require("../controllers/auth.controller");
const { loginHandler } = require('../controllers/auth.controller')
const prisma = require('../db');
const {uploadMiddleware} = require('../services/auth.service')
const router = express.Router();

router.post('/signup/patient', signupPatientHandler);
router.post('/signup/doctor', uploadMiddleware, signupDoctorHandler);
router.post('/login', loginHandler);
router.get('/doctor/:id', async (req, res, next) => {
  try {
   const doctor = await prisma.user.findUnique({
  where: { id: req.params.id },
  select: {
    id: true,
    full_name: true,
    specialization: true,
    license_url: true,
    email: true,
    role: true
  }
});

if (!doctor || doctor.role !== 'doctor') {
  return res.status(404).json({ error: 'Doctor not found' });
}

    res.json({ doctor });
  } catch (err) {
    next(err);
  }
});

module.exports = router;