const mymap = L.map('checkinMap').setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const marker = L.marker([item.coord.lat, item.coord.lon]).addTo(mymap);
    let txt = `The weather here at ${item.name} is ${item.weather.description} with
    a temperature of ${item.main.temp}&deg; C.`;
    
//snd.play();
   var snd = new Audio("data:audio/x-wav;base64,"+item.audio);
  
    marker.bindPopup("<audio controls src=data:audio/wav;base64,"+item.audio +"/>");
  }
  console.log(data);
}
