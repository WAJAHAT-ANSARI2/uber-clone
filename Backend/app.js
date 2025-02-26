const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./Db/db');
const userRoutes = require('../Backend/routes/user.routes');
const captainRoutes = require('../Backend/routes/captain.routes');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



app.get('/', (req,res) => {
    res.send('Hello Wrld');
});

app.use('/users',userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;