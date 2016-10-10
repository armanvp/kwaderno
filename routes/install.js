var util = require('util');
var express = require('express');
var router = express.Router();
var Notebook = require('../models/notebook');
var Note = require('../models/note');

router.get('/', function(req, res) {
    
    var query = Notebook.remove({});
    query.exec()
        .then(function(data) {
            util.log('All notebooks are deleted...');
            var newNotebook = new Notebook({
                name: 'Uncategorized',
                description: 'To be sorted'
            });
            return newNotebook.save();
        })
        .then(function(data) {
            util.log(`Notebook ${data.name} is created...`);
            var newNotebook = new Notebook({
                name: 'Deleted',
                description: 'Deleted notes',
                isSystem: true
            });
            return newNotebook.save();
        })
        .then(function(data) {
            util.log('Notebook "Deleted" is created...');
            res.redirect('/');
        })
        .catch(function(err) {
            console.log(err);
        });

});

module.exports = router;