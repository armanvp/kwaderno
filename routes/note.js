var express = require('express');

var Note = require('../models/note');

var router = express.Router();

// GET - All Documents
router.get('/', function(req, res) {

  var query = Note.find();
  var promise = query.exec();

  promise.then(
    function(result) {
      res.send(result);
    }
  ).catch(
    function(err) {
      res.send(err);
    }
  )

});

// GET - Document by ID
router.get('/:id', function(req, res) {

  var query = Note.findById(req.params.id);
  var promise = query.exec();

  promise.then(
    function(result) {
      res.send(result);
    }
  ).catch(
    function(err) {
      res.send(err);
    }
  );

});

// POST - Create a Note
router.post('/', function(req, res) {

  var newNote = new Note({
    notebook: req.body.notebook,
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    tags: req.body.tags
  });

  var promise = newNote.save();

  promise.then(
    function(result) {
      res.send(result);
    }
  ).catch(
    function(err) {
      res.send(err);
    }
  );

});

// PUT - Change a Note
router.put('/:id', function(req, res) {

  var note = {
    notebook: req.body.notebook,
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    tags: req.body.tags,
    updateDate: Date.now()
  };

  var query = Note.findByIdAndUpdate(req.params.id, note, {new: true});
  var promise = query.exec();

  promise.then(
    function(result) {
      res.send(result);
    }
  ).catch(
    function(err) {
      res.send(err);
    }
  );

});

// DELETE - Delete a Note
router.delete('/:id', function(req, res) {

  var query = Note.findByIdAndRemove(req.params.id);
  var promise = query.exec();

  promise.then(
    function(result) {
      res.send(result);
    }
  ).catch(
    function(err) {
      res.send(err);
    }
  );

});

module.exports = router;
