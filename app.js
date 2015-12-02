var express = require('express');
var app = express();

var exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
    session = require('express-session'),
    bodyParser = require('body-parser');

var url = 'mongodb://localhost:27017/impact';

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(session({secret: "busting code", cookie: {maxAge: 600000}, resave:true, saveUninitialized: false}));
app.use(express.static("public"))
app.use("/static", express.static("/"));

app.get(['/', '/home'], function(req, res, next){
	res.render('home');
})

var port = 3000;

var server = app.listen(port, function(){
	console.log("App running on :::", port);
});
