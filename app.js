var config = require('./config');

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var util = require('util');

// Routes
var notebook = require('./routes/notebook');
var note = require('./routes/note');
var install = require('./routes/install');

// DB - Setup
mongoose.Promise = Promise;
mongoose.connect(config.getDbConnectionString());

var app = express();

// Middleware - Setup
app.use('/api*', bodyParser.json());

// Routes - Static
app.use('/node_modules/', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

// Routes - Setup
app.use('/api/notebook', notebook);
app.use('/api/note', note);

// Data Seed
app.use('/install', install);

app.listen(config.main.PORT, function() {
    util.log(`Server running at port ${ config.main.PORT }`);
});
