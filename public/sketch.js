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
var earliestDate;
var latestDate;
var markers = L.markerClusterGroup();
var debugVerbose = false;
var windowHasLoaded = false;
var useFilters = true;

document.addEventListener("DOMContentLoaded", function (event) {
  windowHasLoaded = true;

  getData();
});

const mapFilters = document.getElementById("mapFilters");
mapFilters.style.display = "none";

const settingsButton = document.getElementById("settingsButton");
settingsButton.addEventListener("click", showHideDiv);

function showHideDiv() {
  if (debugVerbose) {
    console.log("show div " + mapFilters.style.display);
  }
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
var boundingBox = L.rectangle(bounds, { color: "#FFFFFF", weight: 1 });

function resetBoundingBox() {
  mymap.removeLayer(boundingBox);
  bounds = [
    [latMin, lonMin],
    [latMax, lonMax],
  ];
  boundingBox = L.rectangle(bounds, { color: "#FFFFFF", weight: 1 });
  if (useFilters) {
    mymap.addLayer(boundingBox);
  }
}

function isSampleInDateRange(dateStamp) {
  let isInRange =
    earliestDate / 1000 < dateStamp && dateStamp < latestDate / 1000;
  if (debugVerbose) {
    if (isInRange) {
      console.log(
        "Date range from: " +
          earliestDate / 1000 +
          " to " +
          latestDate / 1000 +
          " current date is: " +
          dateStamp
      );
    } else {
      console.log("Not in date range");
    }
  }

  return isInRange;
}

function isSampleInTempRange(itemTemp) {
  let isItemInTempRange =
    itemTemp > minTemp.slice(0, -3) && itemTemp < maxTemp.slice(0, -3);
  if (debugVerbose) {
    if (isItemInTempRange) {
      console.log(
        "Inside temp rang. Temp range from: " +
          minTemp.slice(0, -3) +
          " to " +
          maxTemp.slice(0, -3) +
          " current temp is: " +
          itemTemp
      );
    } else {
      console.log("Not in range temp is" + itemTemp);
    }
  }

  return isItemInTempRange;
}

function isSampleInLatLonRange(itemLat, itemLon) {
  let isInGeoRangeRange =
    parseFloat(itemLat) > parseFloat(latMin) &&
    parseFloat(itemLat) < latMax &&
    parseFloat(itemLon) > parseFloat(lonMin) &&
    parseFloat(itemLon) < parseFloat(lonMax);
  if (debugVerbose) {
    if (isInGeoRangeRange) {
      console.log("Inside lat lon bounds");
    } else {
      console.log("Not in lat lon bounds");
    }
  }

  return isInGeoRangeRange;
}

getData();

async function getData() {
  if (windowHasLoaded) {
    markers.clearLayers();
    mymap.removeLayer(markers);

    var counter = 0;
    const response = await fetch("/api");
    const data = await response.json();

    for (item of data) {
      if (useFilters) {
        if (
          isSampleInTempRange(item.main.temp) &&
          isSampleInDateRange(item.dt) &&
          isSampleInLatLonRange(item.coord.lat, item.coord.lon)
        ) {
          const marker = L.marker([item.coord.lat, item.coord.lon]);
          marker.bindPopup(
            "<b>" +
              "Location:" +
              item.name +
              "<br/> Weather: " +
              item.weather[0].description +
              "<br/> Date: " +
              item.dateName +
              "<br/> Temperature: " +
              item.main.temp +
              "&deg; C" +
              "<br/> Humidity: " +
              item.main.humidity +
              " %" +
              "<br/> Pressure: " +
              item.main.pressure +
              " hPa" +
              "<br/> Wind speed: " +
              item.wind.speed +
              " km/h" +
              "</b> <br>" +
              '<br/><audio controls><source src="/audiofiles/' +
              item.timeStamp +
              '.wav"> type="audio/wave" </audio>'
          );
          markers.addLayer(marker);
        }
        
      }
      if (!useFilters) {
        console.log(item);
        const marker = L.marker([item.coord.lat, item.coord.lon]);
        marker.bindPopup(
          "<b>" +
            "Location:" +
            item.name +
            "<br/> Weather: " +
            item.weather[0].description +
            "<br/> Date: " +
            item.dateName +
            "<br/> Temperature: " +
            item.main.temp +
            "&deg; C" +
            "<br/> Humidity: " +
            item.main.humidity +
            " %" +
            "<br/> Pressure: " +
            item.main.pressure +
            " hPa" +
            "<br/> Wind speed: " +
            item.wind.speed +
            " km/h" +
            "</b> <br>" +
            '<br/><audio controls><source src="/audiofiles/' +
            item.timeStamp +
            '.wav"> type="audio/wave" </audio>'
        );
        markers.addLayer(marker);
      }
    }
    mymap.addLayer(markers);
  }
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
  start: [0, 40],
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
var startentry = 2;
var endEntry = 2;

startentry = timestamp("26 Feb 2022 00:12:00 GMT");
endEntry = timestamp(Date.now());

noUiSlider.create(noUiSliderDateRange, {
  start: [startentry, endEntry],
  connect: true,
  tooltips: [true, true],
  handleAttributes: [
    { "aria-label": "Earliest date" },
    { "aria-label": "Latest date" },
  ],
  range: {
    min: startentry,
    max: endEntry,
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
  earliestDate = values[0];
  latestDate = values[1];
  dateValues[handle].innerHTML = formatter.format(new Date(+values[handle]));
  getData();
});
var filterSwitch = document.getElementById("toggle_filters");
filterSwitch.addEventListener("click", function () {
  if (this.checked) {
    useFilters = true;
    console.log("using filters");
    resetBoundingBox();
    getData();
  } else {
    useFilters = false;
    console.log("not using filters");
    resetBoundingBox();
    getData();
  }
});
