const express = require('express');
const fs = require('fs');

const app = express();

app.use((req, res, next) => {
// get the request information
    // user agent
    // console.log('UserAgent:' + req.headers['user-agent'])
    var userAgent = (req.get('user-agent').replace(/,/g, ''));
    // time
    var dtime = (new Date())
    var time = dtime.toISOString()
    // console.log('Date:' + time)
    // method
    // console.log('method:' + req.method)
    var method = (req.method)
    // resource
    // console.log('resource'+ req.path)
    var path = (req.path)
    // version
    // console.log('version: HTTP/' + req.httpVersion)
    var protocol = ( 'HTTP/' + req.httpVersion)
    // status
    // console.log('Status:' + res.statusCode)
    var Status = (res.statusCode)
  // format the log line
    var csvLine = (userAgent + ',' + time + ',' + method + ',' + path + ',' + protocol + ',' + Status + '\n')
  // console.log the log line
    console.log (csvLine)
  // write the line into a log.csv file (fs.appendFile)
fs.appendFile('log.csv' , csvLine, (err) => {
    if (err) throw err;
})
  next()
});
app.get('/', (req, res) => {
// write your code to respond "ok" here
res.send('ok')
});

app.get('/logs', (req, res) => {
  // get file from csv file (fs.readFile)
  fs.readFile('log.csv', 'utf8' , (err, data) => {
    if (err) throw err;
// transform csv to json using loops ¯\_(ツ)_/¯
    var csvData = data
    var lines = csvData.split("\n");
    var colNames = lines[0].split(",");
    var records=[];
    for(var i = 1; i < lines.length; i++) {
      var record = {};
      var bits = lines[i].split(",");
      for (var j = 0 ; j < bits.length ; j++) {
        record[colNames[j]] = bits[j];
      }
      records.push(record);
 // write your code to return a json object containing the log data here
    }
    console.log(records)
    res.json(records)
  })
 
});

module.exports = app;

//var csvLine = userAgent + "," + time + ',GET' + ',' + req.path + ',HTTP/' 
