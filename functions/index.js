const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require('express');
const dotenv = require('dotenv');
const config = require('./commons/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(console.log('connected!'))
  .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(bodyParser.json());
app.use(cors());

//import route section
const billRouter = require('./modules/bill/bill.router');
const bookingRouter = require('./modules/booking/booking.router');
const customerRouter = require('./modules/customer/customer.router');
const customertypeRouter = require('./modules/customertype/customertype.router');
const roomtypeRouter = require('./modules/roomtype/roomtype.router');
const configRouter = require('./modules/config/config.router');
const roomRouter = require('./modules/room/room.router');
const userRouter = require('./modules/user/user.router');
const authRouter = require('./modules/auth/auth.router');
//define route section
app.use('/bill', billRouter);
app.use('/booking', bookingRouter);
app.use('/customer', customerRouter);
app.use('/customertype', customertypeRouter);
app.use('/room-type', roomtypeRouter);
app.use('/config', configRouter);
app.use('/room', roomRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

exports.api = functions.https.onRequest(app);
