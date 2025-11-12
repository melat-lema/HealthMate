const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is healthy!' });
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
