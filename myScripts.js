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
		var lat;
		var lng;
		resultsList.innerHTML = "";
		clearMarkers();
	  
		for (var item in data.response.venues) {
			// get the info from each venue and display it - just list it for now.
			var venue = data.response.venues[item];
			var name = venue.name;
			var address = venue.location.address;
			var elem = document.createElement('li');
			var a = undefined;
			var info = "";
		
			a = document.createElement('a');
			a.innerText = name;
			if (address !== undefined) {
				a.innerText += (', ' + address);
			}
			if (venue.url !== undefined) {
				a.href = venue.url;
				a.setAttribute('href', venue.url);
				a.setAttribute("target", "_blank");
			}
			elem.appendChild(a);
		
			resultsList.appendChild(elem);
		
			// Just grab the latitude and longitude of the first venue and use this for the map.
			if (lat === undefined || lng === undefined) {
				lat = venue.location.lat;
				lng = venue.location.lng;
				centreMap(lat, lng);
			}
			
			addMarker(venue);
		}
	}
}
  
// Function for centring and zooming into the localised map. Have just hard coded the zoom level for now at 13.
function centreMap(lat, lng) {
    myMap.setView([lat, lng], 13);
}

// Function for adding a venue to the map.
function addMarker(venue) {
	L.marker([venue.location.lat, venue.location.lng]).addTo(myMap);
}

function clearMarkers() {
	// TODO: need to complete function for clearing markers from map.
}

// Function for adding the MapBox map.
function setMap() {
	L.mapbox.accessToken = 'pk.eyJ1IjoiamFrZWJjIiwiYSI6ImNpZWtlY25ieDAwMHF0N2tnMWM3bzVlNjUifQ.Wx2y4OH1Wqm4uXcHfkGqew';
	myMap = L.mapbox.map('map', 'jakebc.ciekd28f4000esukg0bdsh4r9');
}