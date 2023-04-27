// Set up map
var map = L.map('map').setView([40.42, -3.7], 13);
const layers = L.control.layers().addTo(map);
const basemap = L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);
layers.addBaseLayer(basemap, "OpenStreetMap");
layers.addBaseLayer(L.tileLayer.providerESP('PNOA'), "PNOA")

// Add GeoJSON layer
$.getJSON("clips.geojson", function (data) {
  var geojsonLayer = L.geoJSON(data).addTo(map);
});


// Add timeline
const timeline = L.timeline(geojsonLayer, {
  onEachFeature(feature, layer) {
    layer.bindTooltip(feature.properties.name);
  },
  style(feature) {
    return {
      fill: false,
      stroke: true,
      weight: 4,
      color: feature?.properties?.colour ?? "red",
    };
  },
}).addTo(map);

var timelineControl = L.timelineSliderControl({
  enableKeyboardControls: true,
  formatOutput: function (date) {
    return new Date(date).getFullYear().toString();
  },
});

timelineControl.addTo(map).addTimelines(timeline);