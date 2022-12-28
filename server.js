const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const bankRoutes = require('./routes/accountRoutes');
const authRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/api/account', bankRoutes);
app.use('/api/auth', authRoutes);

//connect to database
connectDB();

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
