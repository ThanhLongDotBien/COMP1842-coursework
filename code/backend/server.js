const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const entriesRouter = require('./api/routes/entries')
const customersRouter = require('./api/routes/customers')
app.use('/api/entries', entriesRouter)
app.use('/api/customers', customersRouter)

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message))

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});