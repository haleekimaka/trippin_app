var express = require('express');

var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(__dirname + '/trippin/dist'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000, function () {
    console.log("Listening on port 8000");
})