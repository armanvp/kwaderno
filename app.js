var config = require('./config');

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var util = require('util');

// Routes
var notebook = require('./routes/notebook');
var note = require('./routes/note');

// DB - Setup
mongoose.Promise = Promise;
mongoose.connect(config.getDbConnectionString());

var app = express();

// Middleware - Setup
app.use('/api*', bodyParser.json());

// Routes - Setup
app.use('/api/notebook', notebook);
app.use('/api/note', note);

app.listen(config.main.PORT, function() {
    util.log(`Server running at port ${ config.main.PORT }`);
});
