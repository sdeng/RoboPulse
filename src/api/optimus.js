var csv = require('./node_modules/csv');
var csv_file = '/opt/collectd/var/lib/collectd/csv/localhost/memory/memory-free-2011-10-15';

csv()
.fromPath(csv_file)
.transform(function(data) {
    data.unshift(data.pop());
    return data;
})
.on('data', function(data, index){
    console.log('Bytes Free: ' +data[0]);
});


