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

var config = {
	api_key : 'AIzaSyDj7hVHifbI0aIYWtQi9QIL1cGfMAiDOTQ'
}

var place_of_interest = [
    {
        "id": 1,
        "description": "15 AG Visser Street",
        "latitude": "-33.8944396",
        "longitude": "18.589829899999998"
    },
    {
        "id": 2,
        "description": "UCT Gsb",
        "latitude": "-33.9095955",
        "longitude": "18.4181334"
    },
    {
        "id": 3,
        "description": "codeX",
        "latitude": "-33.9069389",
        "longitude": "18.4189952"
    },
    {
        "id": 4,
        "description": "Cape Town Comedy Club",
        "latitude": "-33.9071812433221",
        "longitude": "18.418371068948744"
    },
    {
        "id": 5,
        "description": "Steers V&A",
        "latitude": "-33.9053469",
        "longitude": "18.4198553"
    },
    {
        "id": 6,
        "description": "KFC V&A",
        "latitude": "-33.9051871",
        "longitude": "18.4200329"
    },
    {
        "id": 7,
        "description": "Philippi Village",
        "latitude": "-34.0011087",
        "longitude": "18.5585684"
    },
    {
        "id": 8,
        "description": "Athlone Library",
        "latitude": "-33.960746",
        "longitude": "18.502602"
    },
    {
        "id": 9,
        "description": "Khayelitsha Hospital",
        "latitude": "-34.0505559",
        "longitude": "18.6725241"
    },
    {
        "id": 10,
        "description": "Guga S'thebe",
        "latitude": "-33.9441175",
        "longitude": "18.5222143"
    },
    {
        "id": 11,
        "description": "london",
        "latitude": "-33.9069058",
        "longitude": "18.4183923"
    },
    {
        "id": 12,
        "description": "Manchester England",
        "latitude": "53.4723679",
        "longitude": "-2.363676"
    },
    {
        "id": 13,
        "description": "Iquitos, Peru - Amazon Rainforest",
        "latitude": "-3.75",
        "longitude": "-73.28"
    },
    {
        "id": 14,
        "description": "Zanzibar Harbour",
        "latitude": "-6.1545341",
        "longitude": "39.1904211"
    },
    {
        "id": 15,
        "description": "paris",
        "latitude": "48.886911",
        "longitude": "2.348383"
    },
    {
        "id": 16,
        "description": "Swaziland",
        "latitude": "-26.797996",
        "longitude": "31.028060"
    },
    {
        "id": 17,
        "description": "Washington D.C.",
        "latitude": "-77.1549966",
        "longitude": "38.8995319"
    },
    {
        "id": 18,
        "description": "Mexico City",
        "latitude": "-99.131992",
        "longitude": "19.433585"
    },
    {
        "id": 19,
        "description": "Rio de Janeiro",
        "latitude": "-22.9103552",
        "longitude": "-43.7285314"
    },
    {
        "id": 20,
        "description": "durban",
        "latitude": "-29.816994",
        "longitude": "30.903916"
    },
    {
        "id": 21,
        "description": "Egypt Pyramids Tours ",
        "latitude": "-33.9069526",
        "longitude": "18.4189372"
    },
    {
        "id": 22,
        "description": "Philippi ,Cape Town",
        "latitude": "-34.008427",
        "longitude": "18.599282"
    }
];

var friends = [
    {
        "id": 1,
        "description": "Lusanda",
        "latitude": "-33.8944396",
        "longitude": "18.589829899999998"
    },
    {
        "id": 2,
        "description": "Zandile",
        "latitude": "-33.9095955",
        "longitude": "18.4181334"
    },
    {
        "id": 3,
        "description": "Lwando",
        "latitude": "-33.9069389",
        "longitude": "18.4189952"
    },
    {
        "id": 4,
        "description": "Ncumisa",
        "latitude": "-33.9071812433221",
        "longitude": "18.418371068948744"
    },
    {
        "id": 5,
        "description": "Siyathemba",
        "latitude": "-33.9053469",
        "longitude": "18.4198553"
    }
];

app.get(['/', '/home'], function(req, res, next){
	res.render('home', {places : place_of_interest,
        friends : friends});
});

app.post(['/', '/home'], function(req, res, next){
    
    var inputData = JSON.stringify(JSON.parse(req.body));

    var place = {
        id : place_of_interest.length,
        description : inputData.place,
        latitude: inputData.latitude,
        longitude: inputData.longitude
    }

	res.render('find_places');
});

var port = 3000;

var server = app.listen(port, function(){
	console.log("App running on :::", port);
});
