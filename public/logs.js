const mymap = L.map('checkinMap').setView([-24.801233, 132.945510], 5);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
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
var progress = document.getElementById('progress');
		var progressBar = document.getElementById('progress-bar');

		function updateProgressBar(processed, total, elapsed, layersArray) {
			if (elapsed > 1000) {
				// if it takes more than a second to load, display the progress bar:
				progress.style.display = 'block';
				progressBar.style.width = Math.round(processed/total*100) + '%';
			}

			if (processed === total) {
				// all markers processed - hide the progress bar:
				progress.style.display = 'none';
			}
		}

		var markers = L.markerClusterGroup({ chunkedLoading: true, chunkProgress: updateProgressBar });
var markerList = [];

async function getData() {
  var counter = 0;
  const response = await fetch('/api');
  const data = await response.json();
  
  console.log(Object.keys(data).length)
  for (item of data) {
    console.log("Getting data : " + counter + " " + item);
    counter ++;
    const marker = L.marker([item.coord.lat, item.coord.lon]).addTo(mymap);

    marker.bindPopup("Location:" + item.name + "<br/> Weather :" + item.weather[0].description + "<br/> Date:" + item.dateName + "<br/> Temperature :" + item.main.temp + "&deg; C.<br/><br/><audio controls><source src=\"/audiofiles/" + item.timeStamp +".wav\"> type=\"audio/wave\" </audio>" )
    markerList.push(marker);
  }
  console.log(data);
  markers.addLayers(markerList);
		myMap.addLayer(markers);
};


