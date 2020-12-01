const functions = require('firebase-functions');

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

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log('connected!'))
  .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(bodyParser.json());

//import route section
const billRouter = require('./modules/bill/bill.router');
const bookingRouter = require('./modules/booking/booking.router');
const customer = require('./modules/customer/customer.router');
const customertype = require('./modules/customertype/customertype.router');
const roomtype = require('./modules/roomtype/roomtype.router');

//define route section
app.use('/bill', billRouter);
app.use('/booking', bookingRouter);
app.use('/customer', customer);
app.use('/customertype', customertype);
app.use('/roomtype', roomtype);

exports.api = functions.https.onRequest(app);
