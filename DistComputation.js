/***
 * Method 1: Using Google Map
 */

// Add the following line to the html file with your Google API Key
//<script src="https://maps.googleapis.com/maps/api/js?key=###KEY###"></script>

function dist(orig, dest){
    var directionsService = new google.maps.DirectionsService();

    var request = {
        origin      : orig,
        destination : dest,
        travelMode  : google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if ( status == google.maps.DirectionsStatus.OK ) {
            return response.routes[0].legs[0].distance.value ;
        }
    });
}


/**
 * Method 2: Using developer.here.com
 */
function geoDist(orig_geoc, dest_geoc){
    var platform = new H.service.Platform({
        'apikey': KEY
    });

    var router = platform.getRoutingService(),
        routeRequestParams = {
            mode: 'fastest;pedestrian',
            representation: 'display',
            routeattributes: 'waypoints,summary,shape,legs',
            maneuverattributes: 'direction,action',
            waypoint0: orig_geoc,
            waypoint1: dest_geoc
        };


    router.calculateRoute(
        routeRequestParams,
        onSuccess,
        onError
    );
}


function onSuccess(result) {
    var route = result.response.route[0];
    /*
     * The styling of the route response on the map is entirely under the developer's control.
     * A representitive styling can be found the full JS + HTML code of this example
     * in the functions below:
     */
    var dist = route.summary.distance;
    var time = route.summary.baseTime;
    console.log("distance is " + dist);
    console.log("time is "+ time);
    return dist
}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param  {Object} error  The error message received.
 */
function onError(error) {
    alert('Can\'t reach the remote server');
}


function addToGeo(address){
    // Instantiate a map and platform object:
    var platform = new H.service.Platform({
        'apikey': '{YOUR_APIKEY}'
    });

// Create the parameters for the geocoding request:
    var geocodingParams = {
        searchText: '200 S Mathilda Ave, Sunnyvale, CA'
    };

// Define a callback function to process the geocoding response:
    var onResult = function(result) {
        var locations = result.Response.View[0].Result;
        return [locations[i].Location.DisplayPosition.Latitude, locations[i].Location.DisplayPosition.Longitude]
    };

// Get an instance of the geocoding service:
    var geocoder = platform.getGeocodingService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
    geocoder.geocode(geocodingParams, onResult, function(e) {
        alert(e);
    });
}