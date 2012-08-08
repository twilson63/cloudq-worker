var request = require('request'),
  url = require('url'),
  _ = require('underscore');

// Worker
//
// Usage
// var Worker = require('cloudq-worker').Worker
// var worker = new Worker(config, function(err, doc, done){
  // TODO: Do Stuff...
  // When complete call done(doc.id, callback);
//  done(doc.id, function(err, res) {
    // Check err for success
//  });
//});
var Worker = exports.Worker = function(options, callback) {
  var completed = function(id, callback) {
    var urlObj = _.clone(options);
    urlObj.pathname = urlObj.pathname + '/' + id
    request.del(url.format(urlObj), { json: true }, function(err, res) {
      console.log(urlObj.pathname + ' - Job Completed');
      if (typeof callback === "function") { callback(err, res) };
    });
  }

  var check = function() {
    request(url.format(options), { json: true }, function(e,r,b) {
      if (!((b.status != null) && b.status === 'empty')) {
        console.log(options.pathname + '/' + b.id + ' - Job Reserved');
        callback(e, b, completed);
      }
    });
  }
  if (!(options.interval)) { options.interval = 1000 };
  setInterval(check, options.interval);
  return this;
}