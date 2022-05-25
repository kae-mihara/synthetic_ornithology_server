const mymap = L.map("checkinMap").setView([-24.801233, 132.94551], 5);
mymap.fitBounds([
  [-10, 112],
  [-44, 154],
]);
var corner1 = L.latLng(-10, 112),
  corner2 = L.latLng(4 - 44, 154),
  geofilter = L.latLngBounds(corner1, corner2);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

googleTerrain = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

var minTemp = 0;
var maxTemp = 0;
var latMin = -20;
var latMax = 20;
var lonMin = -20;
var lonMax = 20;

const latMinSL = document.getElementById("latMin");
const latMaxSL = document.getElementById("latMax");
const lonMinSL = document.getElementById("lonMin");
const lonMaxSL = document.getElementById("lonMax");
const mapFilters = document.getElementById("mapFilters");
mapFilters.style.display = "none";

const settingsButton = document.getElementById("settingsButton");
settingsButton.addEventListener("click", showHideDiv);

function showHideDiv() {
  console.log("show div " + mapFilters.style.display);
  if (mapFilters.style.display === "none") {
    mapFilters.style.display = "inline-block";
    disableMap();
  } else {
    mapFilters.style.display = "none";

    getData();
    enableMap();
  }
}
var bounds = [
  [latMin, lonMin],
  [latMax, lonMax],
];
var boundingBox = L.rectangle(bounds, { color: "#ff7800", weight: 1 });

function resetBoundingBox() {
  mymap.removeLayer(boundingBox);
  bounds = [
    [latMin, lonMin],
    [latMax, lonMax],
  ];
  boundingBox = L.rectangle(bounds, { color: "#ff7800", weight: 1 });
  mymap.addLayer(boundingBox);
  // corner1 = L.latLng(latMin, lonMin);
  // corner2 = L.latLng(latMax, lonMax);
  // geofilter = L.latLngBounds(corner1, corner2);
}

function isSampleInDateRange(dateStamp) {
  // format: mm.dd.yyyy;
  // var minDate = earliestDate.value;
  // var maxDate = latestDate.value;
  // return minDate < dateStamp && dateStamp < maxDate;
}

getData();

async function getData() {
  let markers = L.markerClusterGroup();

  mymap.removeLayer(markers);

  var counter = 0;
  const response = await fetch("/api");
  const data = await response.json();

  for (item of data) {
    if (
      item.main.temp > minTemp.slice(0, -3) &&
      item.main.temp < maxTemp.slice(0, -3) 
    ) {
      // console.log(
      //   "Lat min: " +
      //   parseFloat(latMin) +
      //     " actual lat: " +
      //     parseFloat(item.coord.lat) +
      //     " lat max: " +
      //     parseFloat(latMax) +
      //     " lon min " +
      //     parseFloat(lonMin) +
      //     " actual lon: " +
      //     parseFloat(item.coord.lon) +
      //     " lon max: " +
      //     parseFloat(lonMax)
      // );
      const marker = L.marker([item.coord.lat, item.coord.lon]);
      marker.options.riseOnHover = true;
      marker.bindPopup(
        "Location:" +
          item.name +
          "<br/> Weather :" +
          item.weather[0].description +
          "<br/> Date:" +
          item.dateName +
          "<br/> Temperature :" +
          item.main.temp +
          '&deg; C.<br/><br/><audio controls><source src="/audiofiles/' +
          item.timeStamp +
          '.wav"> type="audio/wave" </audio>'
      );
      markers.addLayer(marker);
    }
  }

  mymap.addLayer(markers);
}

function disableMap() {
  mymap.dragging.disable();
  mymap.touchZoom.disable();
  mymap.doubleClickZoom.disable();
  mymap.scrollWheelZoom.disable();
  mymap.boxZoom.disable();
  mymap.keyboard.disable();
  if (mymap.tap) mymap.tap.disable();
  document.getElementById("checkinMap").style.cursor = "default";
}
function enableMap() {
  mymap.dragging.enable();
  mymap.touchZoom.enable();
  mymap.doubleClickZoom.enable();
  mymap.scrollWheelZoom.enable();
  mymap.boxZoom.enable();
  mymap.keyboard.enable();
  if (mymap.tap) mymap.tap.enable();
  document.getElementById("checkinMap").style.cursor = "grab";
}

var noUiSliderTempRange = document.getElementById("noUiSliderTempRange");

noUiSlider.create(noUiSliderTempRange, {
  start: [10, 40],
  connect: true,
  tooltips: [true, true],
  range: {
    min: -20,
    max: 50,
  },
  format: wNumb({
    decimals: 2,
    suffix: " °C",
  }),
});

noUiSliderTempRange.noUiSlider.on("update", function (values, handles) {
  minTemp = values[0];
  maxTemp = values[1];

  getData();
  //console.log("Temp range: " + values);
});

var noUiSliderLongRange = document.getElementById("noUiSliderLongRange");

noUiSlider.create(noUiSliderLongRange, {
  start: [110, 155],
  connect: true,
  tooltips: [true, true],
  range: {
    min: 100,
    max: 160,
  },
});

noUiSliderLongRange.noUiSlider.on("update", function (values, handles) {
  //console.log("Long range: " + values);
  lonMin = values[0];
  lonMax = values[1];
  resetBoundingBox();
  getData();
});

var noUiSliderLatRange = document.getElementById("noUiSliderLatRange");

noUiSlider.create(noUiSliderLatRange, {
  start: [-45, -10],
  connect: true,
  tooltips: [true, true],
  range: {
    min: -50,
    max: -8,
  },
});

noUiSliderLatRange.noUiSlider.on("update", function (values, handles) {
  //console.log("Lat range: " + values);
  latMin = values[0];
  latMax = values[1];
  resetBoundingBox();
  getData();
});

function timestamp(str) {
  return new Date(str).getTime();
}

var noUiSliderDateRange = document.getElementById("noUiSliderDateRange");

var dateValues = [
  document.getElementById("event-start"),
  document.getElementById("event-end"),
];

noUiSlider.create(noUiSliderDateRange, {
  start: [timestamp("2019"), timestamp("2024")],
  connect: true,
  tooltips: [true, true],
  handleAttributes: [
    { "aria-label": "Earliest date" },
    { "aria-label": "Latest date" },
  ],
  range: {
    min: timestamp("2019"),
    max: timestamp("2024"),
  },
  format: wNumb({
    decimals: 0,
  }),
  tooltips: false,
});
var dateValues = [
  document.getElementById("event-start"),
  document.getElementById("event-end"),
];

var formatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "full",
});

noUiSliderDateRange.noUiSlider.on("update", function (values, handle) {
  console.log("Date range: " + values);
  dateValues[handle].innerHTML = formatter.format(new Date(+values[handle]));
});
