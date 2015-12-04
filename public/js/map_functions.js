// var myDestination = {lat: -33.9069413, lng: 18.49897119999};
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
]

function getDistance(my_loc, my_destination){
	var distance = geolib.getDistance(
					my_loc,
					my_destination
	);
	return distance > 1000 ? distance/1000 + ' km' : distance + ' m';
}

//Get my current location
function getMyLocation (cb) {
	navigator.geolocation.getCurrentPosition(cb);
}

var loc_elem = document.getElementById('loc_elem');

var myLocation = {lat: -33.9069413, lng: 18.41897119999};

// var distance = getDistance(myLocation, myDestination);
var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: myLocation,
		zoom: 15,
		scrollwheel : false
	});

	getMyLocation(function(location){
        // Create a marker and set its position.
        var marker = new google.maps.Marker({
          map: map,
          position: {lat : location.coords.latitude, lng : location.coords.longitude},
          title: 'You are here!'
        });
    })
}

var markers = [];

function showDirections (from_coords, to_coords) {

      var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
      });


      // Set destination, origin and travel mode.
      var request = {
        destination: to_coords,
        origin: from_coords,
        travelMode: google.maps.TravelMode.WALKING
      };

      // Pass the directions request to the directions service.
      var directionsService = new google.maps.DirectionsService();

      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          // Display the route on the map.
          directionsDisplay.setDirections(response);
        }
      });
}

$(document).ready(function() {

    document.getElementById('findPlaces').addEventListener('click', function(){

        $('div[name=places]').removeClass('hidden');

        $('input').click(function(event) {

            var index_of_place_in_arr = event.target.value-1;

            var dest = place_of_interest[index_of_place_in_arr],
                dest_coords = {lat : Number(dest.latitude), lng : Number(dest.longitude)};

            // var marker1 = new google.maps.Marker({
            //     position: myLocation,
            //     map: map,
            //     title : 'You are here!'
            // });

            // var marker2 = new google.maps.Marker({
            //     position: dest_coords,
            //     map: map,
            //     title : dest.description
            // });

            showDirections(myLocation, dest_coords);

        });
    });
});