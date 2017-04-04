var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

app.get('/', function(res,res) {
	res.render('./client/index.html');
});

app.listen(process.env.PORT || 8080);