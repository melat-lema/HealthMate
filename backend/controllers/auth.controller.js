// backend/controllers/auth.controller.js
const AppError = require('../utils/AppError');
const { signupPatient } = require('../services/auth.service');
const { login } = require('../services/auth.service');
const {signupDoctor} =require("../services/auth.service");
const prisma = require('../db');
const signupPatientHandler = async (req, res, next) => {
  const { fullName, email, password, confirmPassword } = req.body;

  // Validation
  if (!fullName || !email || !password || !confirmPassword) {
    return next(new AppError('All fields are required', 400));
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return next(new AppError('Invalid email format', 400));
  }

  if (password !== confirmPassword) {
    return next(new AppError('Passwords do not match', 400));
  }
  if (password.length < 6) {
    return next(new AppError('Password must be at least 6 characters', 400));
  }

  try {
    const patient = await signupPatient({ fullName, email, password });
    res.status(201).json({
      status: 'success',
      data: { patient }
    });
  } catch (err) {
    if (err.code === 'P2002') {
      return next(new AppError('Email already in use', 409));
    }
    next(err);
  }
};
const loginHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password are required', 400));
  }

  try {
    const { token, user } = await login({ email, password });

    // Set JWT in httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use HTTPS in production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        is_verified: user.is_verified
      }
    });
  } catch (err) {
    next(err);
  }
};

const signupDoctorHandler = async (req, res, next) => {
  // First, handle file upload


    const { fullName, email, password, confirmPassword, licenseNumber, hospitalClinic, experienceYears, specialization } = req.body;
    const licenseUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Validation
    if (!fullName || !email || !password || !confirmPassword || !licenseNumber) {
      return next(new AppError('All required fields must be filled', 400));
    }
    if (password !== confirmPassword) {
      return next(new AppError('Passwords do not match', 400));
    }
    if (password.length < 6) {
      return next(new AppError('Password must be at least 6 characters', 400));
    }

    try {
      const doctor = await signupDoctor({ fullName, email, password, licenseNumber, hospitalClinic, experienceYears, specialization });
      
      // Update user with license URL
      await prisma.user.update({
        where: { id: doctor.id },
        data: { license_url: licenseUrl  } // or create a new field `license_url`
      });

      res.status(201).json({
        status: 'success',
        message: 'Doctor account created. Awaiting admin verification.',
        user: {
    id: doctor.id, // 👈 add this
    full_name: doctor.full_name,
    email: doctor.email,
    specialization: doctor.specialization,
    license_url: licenseUrl
  }
      });
    } catch (err) {
      if (err.code === 'P2002') {
        return next(new AppError('Email already in use', 409));
      }
      next(err);
    }
  ;
};


module.exports = { signupPatientHandler,
    loginHandler,
    signupDoctorHandler
 };