var assert = require('assert'),
  url = require('url'),
  request = require('request'),
  Worker = require('../').Worker,
  nock = require('nock');

//nock.recorder.rec();

nock('http://localhost:3000')
  .get('/foo')
  .reply(200, "{\"klass\":\"Foo\",\"args\":[],\"id\":\"b3f217dcfb32870686d169134e009b91\"}", { 'content-type': 'application/json',
  date: 'Wed, 08 Aug 2012 13:55:05 GMT',
  connection: 'keep-alive',
  'transfer-encoding': 'chunked' });  

nock('http://localhost:3000')
  .delete('/foo/b3f217dcfb32870686d169134e009b91')
  .reply(200, "{\"status\":\"complete\"}", { 'content-type': 'application/json',
  date: 'Wed, 08 Aug 2012 14:03:00 GMT',
  connection: 'keep-alive',
  'transfer-encoding': 'chunked' });

var config = {
  protocol: 'http',
  host: 'localhost:3000',
  pathname: '/foo',
  interval: 1000
}

worker = new Worker(config, function(err, doc, done) {
  assert.equal(doc.klass, 'Foo');
  done(doc.id, function(err){
    process.exit(0);
  });
});