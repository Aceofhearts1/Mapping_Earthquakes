// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/Aceofhearts1/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the map object with center and zoom level.
let map = L.map("map", {
    center: [40.7, -94.5],
    zoom: 2,
});

light.addTo(map);

// Create a style for the lines.
let myStyle = {
    color: "skyblue",
    weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3><hr><h3> Destination: "
        + feature.properties.dst + "</h3>");
    }
  }).addTo(map);
});