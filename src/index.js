import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
let DefaultIcon = L.icon({
            ...L.Icon.Default.prototype.options,
            iconUrl: icon,
            iconRetinaUrl: iconRetina,
            shadowUrl: iconShadow
        });
        L.Marker.prototype.options.icon = DefaultIcon;
import "./index.css";

function component() {
  const element = document.createElement('div');
  element.setAttribute("id", "map")

  return element;
}

document.body.appendChild(component());


var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);
L.marker([51.5, -0.09]).addTo(map)
  .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

/*var timelineControl = L.timelineSliderControl({
  formatOutput: function (date) {
    return new Date(date).toString();
  },
});

timelineControl.addTo(map);*/