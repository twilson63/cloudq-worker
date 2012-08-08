# cloudq-worker

A base worker class for cloudq

# Install

``` sh
npm install cloudq-worker
```

# Use

``` sh
var Worker = require('cloudq-worker').Worker;

var worker = new Worker(config, function(err, doc, done){
  // TODO: Do Stuff...
  // When complete call done(doc.id, callback);
  done(doc.id, function(err, res) {
    // Check err for success
  });
});


```

# Config

The config should match the nodejs `urlObj` dsl with one additional key, `interval` if this is not set then the default will 1sec.

# Callback 

arguments:

err - null if not error, otherwise the error of the request
doc - is the document containing the cloudq job
done - is the function to call when you are finished processing the job, it will set the job to completed on cloudq.  You must pass the doc.id and MAY pass a callback function to capture the result of the request to mark the job complete.

# LICENSE

MIT

# Contributing

All pull requests are welcome