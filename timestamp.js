
var express = require('express');
var url = require('url');

var app = express();
// app.use(express.static('pub'));
app.set('view engine', 'jade');
app.set('views', './pub/views');

var months = {
    "Jan": "January", 
    "Feb": "February", 
    "Mar": "March", 
    "Apr": "April", 
    "May": "May", 
    "Jun": "June", 
    "Jul": "July", 
    "Aug": "August", 
    "Sep": "September", 
    "Oct": "October", 
    "Nov": "November", 
    "Dec": "December"
}

app.get('/', function (err, res) {
  res.render('index');
});


app.all('/*', function (req, res) {
    var pathname = url.parse(req.url).pathname.substring(1);
    var payload = function () {
        var baseDate = new Date(decodeURI(pathname));
        if (baseDate == "Invalid Date") {
            return '{"unix":null,"natural":null}';
        } else {
            var utcArr = new Date(baseDate).toUTCString().split(' ');
            var yr = utcArr[3];
            var mo = months[utcArr[2]];
            var dd = parseInt(utcArr[1]);            
            return {
                "unix": new Date(baseDate).getTime()/1000,
                "natural":  mo+" "+dd+", "+yr
            } 
        }
    }
    console.log(payload());
    res.send(payload());
});

  var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});