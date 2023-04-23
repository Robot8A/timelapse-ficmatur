// Set up map
var map = L.map('map').setView([40.42, -3.7], 13);
const layers = L.control.layers().addTo(map);
const basemap = L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);
layers.addBaseLayer(basemap, "OpenStreetMap");
layers.addBaseLayer(L.tileLayer.providerESP('PNOA'), "PNOA")

// Add marker
L.marker([40.42, -3.7]).addTo(map)
  .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

// Add timeline
var timelineControl = L.timelineSliderControl({
  formatOutput: function (date) {
    return new Date(date).toString();
  },
});

timelineControl.addTo(map);