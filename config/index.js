var main = require('./config');

var config = {
  main: main,
  getDbConnectionString: function() {
    var dbConnectionString = 'mongodb://localhost/kwaderno';
    return dbConnectionString;
  }
};

module.exports = config;
