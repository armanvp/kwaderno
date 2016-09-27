var express = require('express');

var Notebook = require('../models/notebook');
var Note = require('../models/note');

var router = express.Router();

// GET - All Documents
router.get('/', function(req, res) {

  var query = Notebook.find();
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

  var query = Notebook.findById(req.params.id);
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

// POST - Create a Notebook
router.post('/', function(req, res) {

  var newNotebook = new Notebook({
    name: req.body.name,
    description: req.body.description,
  });

  var promise = newNotebook.save();

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

// PUT - Change a Notebook
router.put('/:id', function(req, res) {

  var notebook = {
    name: req.body.name,
    description: req.body.description,
  };

  var query = Notebook.findByIdAndUpdate(req.params.id, notebook);
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

// DELETE - Delete a Notebook
router.delete('/:id', function(req, res) {

  var query = Notebook.findByIdAndRemove(req.params.id);
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

router.get('/:id/notes', function(req, res) {

  var query = Note.find({ notebook: req.params.id });
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
