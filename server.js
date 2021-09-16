/*Imports*/
  const http = require('http');
  const express = require('express');
  var cors = require('cors');
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');
  const config = require('./DB');
/*Imports*/

/*Routes*/
const categoryRoutes = require('./routes/category.route');
const shopRoutes = require('./routes/shop.route');
const expenseRoutes = require('./routes/expense.route');
/*Routes*/

/*API*/
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/category', categoryRoutes);
app.use('/shop', shopRoutes);
app.use('/expense', expenseRoutes);
const server  = http.createServer(app);
const port = process.env.PORT || 4000;
server.listen(port);
/*API*/

/*DB*/
const mongodb = process.env.MONGODB_URI || config.DB;
mongoose.Promise = global.Promise;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(o => {
  console.log('Connected to DB!');
}, err => console.log('Error: ' + err));
/*DB*/