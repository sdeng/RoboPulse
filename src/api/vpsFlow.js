
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);
var mongoose = require('mongoose');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.listen(3000);

mongoose.connect('mongodb://localhost/vpsFlow_db');

var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;


var vpsFlowStat = new Schema({
	stats : {type: String}
	});


var stats = mongoose.model('vpsFlowStat', vpsFlowStat);

var max_id = 0;

stats.find({}).sort(['_id'],-1).limit(1).run(function(err,doc){
 		console.log(doc);
	       	max_id = doc[0]._id;
	});


io.sockets.on('connection', function(socket) {
	console.log('new connection');
	stats.find({}, function(err, docs) {
		console.log('querying the collection');
		console.log(docs);
		console.log(err);
		socket.emit('data',docs);
	});


});

var interval = setInterval(function(){
		stats.find({'_id':{$gt:max_id}}).sort(['_id'],1).limit(1).run(function(err,doc){
			if(doc!=undefined && doc[0]!=undefined){
				io.sockets.emit('data',doc);
				max_id = doc[0]._id;
				console.log(max_id);
			}
			else{
				console.log("no new data");
			};
		});
	},10);


console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
