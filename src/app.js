'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');

const options = {root: path.join(__dirname, '/public/views')};

const app = express();

mongoose.Promise = global.Promise;

// Connect to database 
mongoose.connect(config.connectionString, { useNewUrlParser: true, dbName: 'name-db' });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.static(__dirname + '/public'));

// load of the models
const Customer = require('./models/customer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load of the routes
const customer = require('./routes/customer')

// Allow the CORS
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	next();
});

// Pages
app.get('/', (req, res) => res.sendFile('index.html', options));

// Routes API 
app.use('/customer', customer);

module.exports = app;



