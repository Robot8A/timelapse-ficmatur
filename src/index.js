// Set up map
var map = L.map('map').setView([40.42, -3.7], 12);

// Add custom control to display the clip counter
var counterControl = L.control.custom({
    position: 'topright',
    content : '<div style="font-weight: bold">Año seleccionado</div>' +
        '<div id="cd-clips" class="counter-div">'+
        '<span id="ct-clips" class="counter-text">Clips</span>' +
        '<span id="cn-clips" class="counter-number">0</span>' +
        '</div>' +
        '<div id="cd-movies" class="counter-div">'+
        '<span id="ct-movies" class="counter-text">Películas</span>' +
        '<span id="cn-movies" class="counter-number">0</span>' +
        '</div>',
    classes : 'leaflet-control-layers counter-control',
    style   :
        {},
    datas   :
        {},
    events:
        {
            click: function(data)
            {
                console.log('wrapper div element clicked');
                console.log(data);
            },
            dblclick: function(data)
            {
                console.log('wrapper div element dblclicked');
                console.log(data);
            },
            contextmenu: function(data)
            {
                console.log('wrapper div element contextmenu');
                console.log(data);
            },
        }
})
    .addTo(map);

function updateCurrentYearCounter(timeline) {
    var displayed = timeline.getLayers();
    var list = document.getElementById("displayed-list");
    var count = 0;
    displayed.forEach(function () {
        count++;
    });
    document.getElementById("cn-clips").textContent = count.toString();
}

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
      layer.bindTooltip(
          '<h3><b>' + feature.properties['Titulo'] + '</b> (' + feature.properties['Director'] + ', ' +
          feature.properties['Ano'] +  ')</h3><img src="https://geocine.uc3m.es/pficmatur/fotogramas/' +
          feature.properties['id'] + '.jpg" style="width: 200px;display: block;margin-left: auto;margin-right: auto;">',
          {
              interactive: true,
              permanent: true,
          }
      );
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

  let startYear = 1953;
  let endYear = 2018;

  timelineControl = L.timelineSliderControl({
    enableKeyboardControls: true,
    showTicks: false,
    position: "bottomright",
    start: (new Date(startYear.toString() + "-02-02")).getTime(), // day and month not relevant, but better to state a day in the middle of the year
    end: (new Date(endYear.toString() + "-02-02")).getTime(),
    steps: (endYear-startYear),
    duration: (endYear-startYear)*1000, // milliseconds
    formatOutput: function (date) {
      return new Date(date).getFullYear().toString();
    },
  });

  timelineControl.addTo(map).addTimelines(timeline);

  timeline.on("change", function (e) {
    updateCurrentYearCounter(e.target);
  });
  updateCurrentYearCounter(timeline);
});