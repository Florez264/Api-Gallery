const express = require('express');
const cors = require('cors');
const path = require('path'); // Agrega esta línea
const connectDB = require('./config/database');
const photoRoutes = require('./routes/photoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('./uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);

module.exports = app;
