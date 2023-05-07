// Set up map
var map = L.map('map').setView([40.42, -3.7], 12);

// Add layer control
const layers = L.control.layers().addTo(map);

// Add base layers (OSM & PNOA)
const basemap = L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);
layers.addBaseLayer(basemap, "OpenStreetMap");
layers.addBaseLayer(L.tileLayer.providerESP('PNOA'), "PNOA")

var timelineControl;

// Add GeoJSON layer
$.getJSON("clips.geojson", function (data) {
  // Add timeline
  const timeline = L.timeline(data, {
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

  timelineControl = L.timelineSliderControl({
    enableKeyboardControls: true,
    showTicks: false,
    position: "bottomright",
    start: (new Date("1953-02-02")).getTime(), // day and month not relevant, but better to state a day in the middle of the year
    end: (new Date("2018-02-02")).getTime(),
    steps: (2018-1953),
    duration: (2018-1953)*1000, // milliseconds
    formatOutput: function (date) {
      return new Date(date).getFullYear().toString();
    },
  });

  timelineControl.addTo(map).addTimelines(timeline);
});