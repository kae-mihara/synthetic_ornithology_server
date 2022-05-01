const mymap = L.map('checkinMap').setView([
    -24.801233,
    132.945510
], 5);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {
    attribution
});
tiles.addTo(mymap);
const latMinSL = document.getElementById("latMin");
const latMaxSL = document.getElementById("latMax");
const lonMinSL = document.getElementById("lonMin");
const lonMaxSL = document.getElementById("lonMax");
var bounds = [
    [
        latMaxSL.value,
        lonMaxSL.value
    ],
    [
        latMinSL.value,
        lonMinSL.value
    ]
];
var boundingBox = L.rectangle(bounds, {
    color: "#ff7800",
    weight: 1
});
latMinSL.addEventListener("change", function() {
    resetBoudningBox();
});
latMaxSL.addEventListener("change", function() {
    resetBoudningBox();
});
lonMinSL.addEventListener("change", function() {
    resetBoudningBox();
});
lonMaxSL.addEventListener("change", function() {
    resetBoudningBox();
});
function resetBoudningBox() {
    mymap.removeLayer(boundingBox);
    bounds = [
        [
            latMinSL.value,
            lonMinSL.value
        ],
        [
            latMaxSL.value,
            lonMaxSL.value
        ]
    ];
    boundingBox = L.rectangle(bounds, {
        color: "#ff7800",
        weight: 1
    });
    mymap.addLayer(boundingBox);
}
const minTempSL = document.getElementById("minTemp");
const maxTempSL = document.getElementById("maxTemp");
var minTemp;
var maxTemp;
minTempSL.addEventListener("change", function() {
    minTemp = minTempSL.value;
    console.log("Min temp: " + minTemp);
});
maxTempSL.addEventListener("change", function() {
    maxTemp = maxTempSL.value;
    console.log("Max temp: " + maxTemp);
});
const earliestDate = document.getElementById("start");
const latestDate = document.getElementById("end");
earliestDate.max = new Date().toISOString().substring(0, 10);
latestDate.value = new Date().toISOString().substring(0, 10);
latestDate.max = new Date().toISOString().substring(0, 10);
function isSampleInDateRange(dateStamp) {
    // format: mm.dd.yyyy;
    var minDate = earliestDate.value.getTime();
    var maxDate = latestDate.value.getTime();
    return minDate < dateStamp && dateStamp < maxDate;
}
getData();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    for (item of data){
        const marker = L.marker([
            item.coord.lat,
            item.coord.lon
        ]).addTo(mymap);
        let txt = `The weather here at ${item.name} is ${item.weather.description} with
    a temperature of ${item.main.temp}&deg; C.`;
        // marker.bindPopup(txt);
        marker.bindPopup("Location:" + item.name + "<br/> Weather :" + item.weather[0].description + "<br/> Date:" + item.dateName + "<br/> Temperature :" + item.main.temp + "&deg; C.<br/><br/><audio controls><source src=\"/audiofiles/" + item.timeStamp + ".wav\"> type=\"audio/wave\" </audio>");
    }
    console.log(data);
}

//# sourceMappingURL=index.c88ee413.js.map
