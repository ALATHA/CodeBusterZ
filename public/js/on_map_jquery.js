var markers = [];

function addMarker(location) {
   var marker = new google.maps.Marker({
       position: location,
       map: map
   });
   markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

$(document).ready(function() {
	document.getElementById('findPlaces').addEventListener('click', function(){
		$('div[name=places]').removeClass('hidden');
		$('input').click(function(event) {
			/* Act on the event */
			var index_of_place_in_arr = event.target.value-1;
		});
	});

	document.getElementById('findFriends').addEventListener('click', function(){
		$('div[name=friends]').removeClass('hidden');
		$('input').click(function(event) {
			/* Act on the event */
			var index_of_place_in_arr = event.target.value-1;
		});
	});
});