var csv = require('./node_modules/csv');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/vpsFlow_db');
// Embedded document model
var Schema = mongoose.Schema;
var Stat = mongoose.Schema;

var Stat = new Schema({
    timestamp: {type: Number},
    type: {type: String},
    value: {type: Number}
});

var Server = new Schema({
    stats: [Stat]
});

var ServerModel = mongoose.model('Server', Server);
var server = new ServerModel();


// Read CSV log
var csv_files = [
    '/opt/collectd/var/lib/collectd/csv/localhost/memory/memory-free-2011-10-15',
    '/opt/collectd/var/lib/collectd/csv/localhost/memory/memory-used-2011-10-15',
    '/opt/collectd/var/lib/collectd/csv/localhost/memory/memory-cached-2011-10-15',
    '/opt/collectd/var/lib/collectd/csv/localhost/memory/memory-buffered-2011-10-15'
]

csv_files.forEach(function(csv_file) {
    // Extract name of stat
    segments = csv_file.split('/');
    stat_type = segments[segments.length-1];
    stat_type_segments = stat_type.split('-');
    stat_type = stat_type_segments[0] + ' ' + stat_type_segments[1];

    csv()
    .fromPath(csv_file)
    .transform(function(data) {
        data.unshift(data.pop());
        return data;
    })
    .on('data', function(data, index){
        if (data[1] == "epoch") {
            return;
        }
        console.log(data[1]);
        server.stats.push({
            'timestamp': data[1],
            'type': stat_type,
            'value': data[0]
        });
        console.log('Right before the save...');
        server.save(function(err) {
            console.log('Attempting to save...');
            if (!err) {
                console.log('No error.');
            } else {
                console.log('Error!');
            }
        });
    });
});



