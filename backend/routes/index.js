const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');


router.use('/api/auth', authRoutes);
// Serve static files from uploads folder
router.use('/uploads', express.static('uploads'));
module.exports = router;