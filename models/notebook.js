var mongoose = require('mongoose');
var Note = require('./note');

var NotebookSchema = mongoose.Schema({
  name: String,
  description: String,
  isSystem: Boolean
});

var Notebook = mongoose.model('Notebook', NotebookSchema);

module.exports = Notebook;
