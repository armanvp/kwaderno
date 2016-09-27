var mongoose = require('mongoose');

var NoteSchema = mongoose.Schema({
  notebook: String,
  title: String,
  author: String,
  body: String,
  createDate: { type: Date, default: Date.now },
  updateDate: Date,
  tags: [String]
});

var Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
