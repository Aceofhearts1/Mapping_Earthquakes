// Accessing the Toronto neighborhoods GeoJSON URL.
let earthquakeSpot = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
    "Streets": streets,
    "Satellite Streets" : satelliteStreets,
    "Light Street": light
};

// Create the map object with center and zoom level.
let map = L.map("map", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [satelliteStreets]
});

L.control.layers(baseMaps).addTo(map);

let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(),
        stroke: true,
        weight: 0.5
        };
}
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
}


// Grabbing our GeoJSON data.
d3.json(earthquakeSpot).then(function(data) {
    console.log(data);

    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {

    // We turn each feature into a circleMarker on the map.
        
    pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
            },
        // We set the style for each circleMarker using our styleInfo function.
        style: styleInfo
    }).addTo(map);
});