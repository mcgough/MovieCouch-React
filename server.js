var express = require('express');
var app = express();

app.use(express.static(__dirname + '/client'));

app.get('/', function(res, res) {
	res.render('index.html');
});

app.listen(process.env.PORT || 8080);