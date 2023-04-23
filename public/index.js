var map = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);
L.marker([51.5, -0.09]).addTo(map)
  .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

var timelineControl = L.timelineSliderControl({
  formatOutput: function (date) {
    return new Date(date).toString();
  },
});

timelineControl.addTo(map);