const mymap = L.map("checkinMap").setView([-24.801233, 132.94551], 5);

mymap.fitBounds([
  [-10, 112],
  [-44, 154]
])

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

const latMinSL = document.getElementById("latMin");
const latMaxSL = document.getElementById("latMax");
const lonMinSL = document.getElementById("lonMin");
const lonMaxSL = document.getElementById("lonMax");
const mapFilters = document.getElementById("mapFilters");
mapFilters.style.display = "none";

const settingsButton = document.getElementById("settingsButton");
settingsButton.addEventListener("click", showHideDiv);

function showHideDiv(){
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
  [latMaxSL.value, lonMaxSL.value],
  [latMinSL.value, lonMinSL.value],
];
var boundingBox = L.rectangle(bounds, { color: "#ff7800", weight: 1 });

function resetBoundingBox() {
  mymap.removeLayer(boundingBox);
  bounds = [
    [latMinSL.value, lonMinSL.value],
    [latMaxSL.value, lonMaxSL.value],
  ];
  boundingBox = L.rectangle(bounds, { color: "#ff7800", weight: 1 });
  mymap.addLayer(boundingBox);
}

latMinSL.addEventListener("change", function () {
  document.getElementById("latMinL").textContent =
    "Min Latitude: " + latMinSL.value;
  resetBoundingBox();
  getData();
});

latMaxSL.addEventListener("change", function () {
  document.getElementById("latMaxL").textContent =
    "Max Latitude: " + latMaxSL.value;
  resetBoundingBox();
  getData();
});

lonMinSL.addEventListener("change", function () {
  document.getElementById("lonMinL").textContent =
    "Min Longitude: " + lonMinSL.value;
  resetBoundingBox();
  getData();
});

lonMaxSL.addEventListener("change", function () {
  document.getElementById("lonMaxL").textContent =
    "Max Longitude: " + lonMaxSL.value;
  resetBoundingBox();
  getData();
});

const minTempSL = document.getElementById("minTemp");
const maxTempSL = document.getElementById("maxTemp");
var minTemp = 0;
var maxTemp = 40;

minTempSL.addEventListener("change", function () {
  minTemp = minTempSL.value;
  document.getElementById("minTempL").textContent =
    "Min temp: " + minTempSL.value;
  getData();
  minTempSL.setAttribute("label", minTempSL.value);
});

maxTempSL.addEventListener("change", function () {
  maxTemp = maxTempSL.value;
  document.getElementById("maxTempL").textContent =
    "Max temp: " + maxTempSL.value;
  getData();
  
});

const earliestDate = document.getElementById("start-date");
const latestDate = document.getElementById("end-date");

function isSampleInDateRange(dateStamp) {
  // format: mm.dd.yyyy;
  var minDate = earliestDate.value;
  var maxDate = latestDate.value;

  return minDate < dateStamp && dateStamp < maxDate;
}

getData();

async function getData() {
  var markers = L.markerClusterGroup();

  mymap.removeLayer(markers);

  var counter = 0;
  const response = await fetch("/api");
  const data = await response.json();

  console.log(Object.keys(data).length);
  for (item of data) {
    console.log("Getting data : " + counter + " " + item);
    counter++;
    console.log( latMinSL.value + " " + item.coord.lat + " " + latMaxSL.value +  " " + lonMinSL.value + " " + item.coord.lon + " " + lonMaxSL.value);
    // if(item.coord.lat > latMinSL.value && item.coord.lat < latMaxSL.value){
    //console.log("Min temp: " + minTemp + " Max Temp: " + maxTemp + " Actual temp: " + item.main.temp)
    if (item.main.temp > minTemp && item.main.temp < maxTemp) {
      if(item.coord.lat > latMaxSL.value && item.coord.lat < latMinSL.value && item.coord.lon > lonMaxSL.value && item.coord.lon < lonMinSL.value){
      const marker = L.marker([item.coord.lat, item.coord.lon]);
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
    //  }
  }
  //console.log(data);
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
