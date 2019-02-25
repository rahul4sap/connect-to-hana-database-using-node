const express = require('express');
const app = express();
const hdb = require('hdb');

var client = hdb.createClient({
    host: 'hxehost',
    port: 39015,
    user: 'system',
    password: 'SapAbap1'
});

app.get('/', (req, res) => {
    client.on('error', function (err) {
        console.error('Network connection error', err);
    });

    client.connect(function (err) {
        if (err) {
            return console.error('Connect error', err);
        }
        client.exec('select * from DUMMY', function (err, rows) {
            client.end();
            if (err) {
                return console.error('Execute error:', err);
            }
            res.send(rows);
            console.log('Results:', rows);
        });
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));