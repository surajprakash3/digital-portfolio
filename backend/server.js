const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/content', require('./routes/content'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
    res.send('Solar Portfolio API Running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
