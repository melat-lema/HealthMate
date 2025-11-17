// backend/services/auth.service.js
const bcrypt = require('bcrypt');
const prisma = require('../db');
const jwt = require('jsonwebtoken');
const fs= require("fs");
const path= require("path");
const multer = require('multer');


const signupPatient = async ({ fullName, email, password }) => {
  // 1. Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // 2. Create patient
  const patient = await prisma.user.create({
    data: {
      full_name: fullName,
      email: email.toLowerCase(),
      password_hash: hashedPassword,
      role: 'patient',
      is_verified: false, // you can verify later via email
    },
    select: {
      id: true,
      email: true,
      full_name: true,
      role: true,
    }
  });

  return patient;
};
const login = async ({ email, password }) => {
  // Find user
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      is_verified: user.is_verified
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token, user };
};
const signupDoctor = async ({ fullName, email, password, licenseNumber, hospitalClinic, experienceYears, specialization,licenseUrl  }) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create doctor with is_verified: false
  const doctor = await prisma.user.create({
    data: {
      full_name: fullName,
      email: email.toLowerCase(),
      password_hash: hashedPassword,
      role: 'doctor',
      license_number: licenseNumber,
      hospital_clinic: hospitalClinic,
      license_url: licenseUrl,
      experience_years: parseInt(experienceYears) || null,
      specialization: specialization,
      is_verified: false, // 👈 crucial: new doctors are unverified
    },
    select: {
      id: true,
      email: true,
      full_name: true,
      role: true,
      is_verified: true,
    }
  });

  return doctor;
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadMiddleware = multer({ storage }).single('licenseFile');
const upload = multer({ storage });

module.exports = { signupPatient
, login,
signupDoctor,
  upload,
  uploadMiddleware
 };