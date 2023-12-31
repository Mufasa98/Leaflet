  var myMap = L.map("map", {
    center: [44.427963,-110.5884],
    zoom: 4,
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  function markerSize(magnitude) {
    return magnitude;
  };
  

var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(geoData).then(function(data){
  L.geoJson(data,{pointToLayer:function(feature,coordinates){
    return L.circleMarker(coordinates)
    .bindPopup(`<h2>Earthquake Location: ${feature.properties.place}</h2> <hr> <h3>Magnitude: ${feature.properties.mag}</h3> <hr> <h3>Depth: ${feature.geometry.coordinates[2]} km</h3>`);
  },style: stylish
  }).addTo(myMap)

});


function depth(feature) {
  switch(true) {
    case feature > 25:
      return 'red';
    case feature < 25:
      return 'yellow'
    default:
      return 'green'
  };
}

function stylish(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    color:'black',
    weight: 0.3,
    fillColor: depth(feature.geometry.coordinates[2]), radius: markerSize(feature.properties.mag)
  };

}

var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(myMap) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Earthquake Depth</h4>";
  div.innerHTML += '<i style="background: red"></i><span>>25 km</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span><25 km</span><br>';

  return div;
};

legend.addTo(myMap);