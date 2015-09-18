// Info needed for the foursquare request - not sure the secret should be hard coded like this???
var config = {
	clientID: 'KQAJGIJZEEHA5YT1U212K3Q3PYZVBMUD2Z5BJQLEQMTGSG4B',
	clientSecret: 'WJY00GOCGS45REOKJHCEJT5WHLQ1KLL0GGLPSYASY32Y2GA5',
};

var myMap;
  
// Get the JSON response with the venues data.
$(document).ready(function(){
	$("button").click(function(){
		var url = 'https://api.foursquare.com/v2/venues/search' +
			'?client_id=' + config.clientID +
			'&client_secret=' + config.clientSecret +
			'&v=20130815' +
			'&near=' + document.getElementById('place').value;
			
		$.get(url, function(data){
			displayResults(data);
		});
    });
});
  
// Function for displaying the resulting list of venues.
function displayResults(data) {
    if (data !== undefined) {
		var resultsList = document.getElementById('results');
		var lat = data.response.geocode.feature.geometry.center.lat;
		var lng = data.response.geocode.feature.geometry.center.lng;
		resultsList.innerHTML = "";
		clearMarkers();
	  
		for (var item in data.response.venues) {
			// get the info from each venue and display it - just list it for now.
			var venue = data.response.venues[item];
			var elem = document.createElement('li');
			var a = getVenueLink(venue);
			a.setAttribute('onmouseover', 'selectedVenue(this)');
		
			elem.appendChild(a);
			resultsList.appendChild(elem);
			addMarker(venue);
		}
		centreMap(lat, lng);
	}
}

// Create a link element for the given venue.
function getVenueLink(venue) {
	a = document.createElement('a');
	a.innerText = venue.name;
	if (venue.location.address !== undefined) {
		a.innerText += (', ' + venue.location.address);
	}
	if (venue.url !== undefined) {
		a.href = venue.url;
		a.setAttribute('href', venue.url);
		a.setAttribute('target', '_blank');
	}
	a.setAttribute('class', venue.id);
	return a;
}
  
// Function for centring and zooming into the localised map. Have just hard coded the zoom level for now at 16.
function centreMap(lat, lng) {
    myMap.setView([lat, lng], 16);
}

// Function for adding a venue to the map.
function addMarker(venue) {
	var marker = L.marker([venue.location.lat, venue.location.lng],
	{title: venue.name, opacity: 0.5}
	);
	marker.addTo(myMap).bindPopup(getVenueLink(venue));
}

function clearMarkers() {
	// TODO: need to complete function for clearing markers from map.
}

// Function for adding the MapBox map.
function setMap() {
	L.mapbox.accessToken = 'pk.eyJ1IjoiamFrZWJjIiwiYSI6ImNpZWtlY25ieDAwMHF0N2tnMWM3bzVlNjUifQ.Wx2y4OH1Wqm4uXcHfkGqew';
	myMap = L.mapbox.map('map', 'jakebc.ciekd28f4000esukg0bdsh4r9');
}

function selectedVenue(venue) {
	// TODO: Provide some highlighting to the corresponding marker.
}