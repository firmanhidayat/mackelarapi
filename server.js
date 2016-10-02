var express        = require('express');
var passport       = require('passport');
var path           = require('path');
var app            = express();
var bodyParser     = require('body-parser');

var session;

var viewHomePage   = require('./routes/index');
var viewCategory   = require('./routes/category');
var viewProduct    = require('./routes/product');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', viewHomePage);
app.use('/index', viewHomePage);
app.use('/category', viewCategory);
app.use('/product', viewProduct);

var server = app.listen(8081, function () {
   var host = server.address().address || "localhost";
   var port = server.address().port;
   console.log("Server is listening at http://%s:%s", host, port);
});