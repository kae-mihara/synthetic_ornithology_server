const mymap = L.map('checkinMap').setView([-24.801233, 132.945510], 5);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

//let thisy =  document.getElementById("start");

//.max = new Date().toISOString().substring(0, 10);
//console.log(thisy.max);

getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const marker = L.marker([item.coord.lat, item.coord.lon]).addTo(mymap);
    let txt = `The weather here at ${item.name} is ${item.weather.description} with
    a temperature of ${item.main.temp}&deg; C.`;

   
   // marker.bindPopup(txt);

    marker.bindPopup("Location:" + item.name + "<br/> Weather :" + item.weather[0].description + "<br/> Date:" + item.dateName + "<br/> Temperature :" + item.main.temp + "&deg; C.<br/><br/><audio controls><source src=\"/audiofiles/" + item.timeStamp +".wav\"> type=\"audio/wave\" </audio>" )
  }
  console.log(data);
}

