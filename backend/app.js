const express = require('express');
const router = require('./routes/index');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow all origins, adjust as necessary for security
    optionsSuccessStatus: 200, // For legacy browser support
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is healthy!' });
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
