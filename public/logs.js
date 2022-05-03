const mymap = L.map('checkinMap').setView([-24.801233, 132.945510], 5);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//const tileUrl = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
//const tileUrl = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';

  googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

const latMinSL = document.getElementById("latMin");
const latMaxSL = document.getElementById("latMax");
const lonMinSL = document.getElementById("lonMin");
const lonMaxSL = document.getElementById("lonMax");
var bounds = [[latMaxSL.value, lonMaxSL.value] , [latMinSL.value, lonMinSL.value]];
var boundingBox = L.rectangle(bounds, {color: "#ff7800", weight: 1});

function resetBoundingBox(){
  mymap.removeLayer(boundingBox);
  bounds = [[latMinSL.value, lonMinSL.value], [latMaxSL.value, lonMaxSL.value]];
  boundingBox = L.rectangle(bounds, {color: "#ff7800", weight: 1});
  mymap.addLayer(boundingBox);
};

latMinSL.addEventListener("change", function() {
  resetBoundingBox();
});

latMaxSL.addEventListener("change", function() {
  resetBoundingBox();
});

lonMinSL.addEventListener("change", function() {
  resetBoundingBox();
});

lonMaxSL.addEventListener("change", function() {
  resetBoundingBox();
});



const minTempSL = document.getElementById("minTemp");
const maxTempSL = document.getElementById("maxTemp");
var minTemp;
var maxTemp;

minTempSL.addEventListener("change", function(){
  minTemp= minTempSL.value;
  console.log("Min temp: " +  minTemp);
});

maxTempSL.addEventListener("change", function(){
  maxTemp=maxTempSL.value;
  console.log("Max temp: " + maxTemp);
});

const earliestDate = document.getElementById("start");
const latestDate = document.getElementById("end");

earliestDate.max = new Date().toISOString().substring(0, 10);
latestDate.value = new Date().toISOString().substring(0, 10);
latestDate.max = new Date().toISOString().substring(0, 10);


function isSampleInDateRange( dateStamp ) {
  // format: mm.dd.yyyy;
  var minDate = earliestDate.value.getTime();
  var maxDate = latestDate.value.getTime();
 

  return minDate < dateStamp && dateStamp < maxDate;
};

getData();

var markers = L.markerClusterGroup();

async function getData() {
  var counter = 0;
  const response = await fetch('/api');
  const data = await response.json();
  
  console.log(Object.keys(data).length)
  for (item of data) {
    console.log("Getting data : " + counter + " " + item);
    counter ++;
   // if(item.coord.lat > latMinSL.value && item.coord.lat < latMaxSL.value){
     console.log("Min temp: " + minTemp + " Max Temp: " + maxTemp + " Actual temp: " + item.main.temp)
     // if(item.main.temp > minTemp && item.main.temp < maxTemp){
        const marker = L.marker([item.coord.lat, item.coord.lon]);
        marker.bindPopup("Location:" + item.name + "<br/> Weather :" + item.weather[0].description + "<br/> Date:" + item.dateName + "<br/> Temperature :" + item.main.temp + "&deg; C.<br/><br/><audio controls><source src=\"/audiofiles/" + item.timeStamp +".wav\"> type=\"audio/wave\" </audio>" )
        markers.addLayer(marker);
     // }
  //  }

    
  }
  console.log(data);
  mymap.addLayer(markers);
};


