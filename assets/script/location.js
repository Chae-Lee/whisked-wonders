// var rapidURL = "https://api.api-ninjas.com/v1/recipe?query=";
// var query = "tiramisu"; // Query text to search
// var XApiKey = "e0faed762bmsh60b9c6ae7e9fa90p165d20jsn437c35637387";

// var query1 = rapidURL + query + "&apikey=" + XApiKey;

// fetch(query1)
// .then(function(response){
//     return response.json()
// }).then(function(data){
//     console.log(data);
// })

// var btnEl = document.getElementById("recipe-input-button");
// var textAreaEl = document.getElementsByClassName("recipe-input");

// var formEl = document.getElementsByClassName("user-input");

// formEl.addEventListener("submit",function(e){
//     e.preventDefault();
//     getRecipe(e.value.trim());

// })

// async function getRecipe(){
//     const url = 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=brownie';
//     const options = {
// 	    method: 'GET',
// 	    headers: {
// 		    'X-RapidAPI-Key': 'e0faed762bmsh60b9c6ae7e9fa90p165d20jsn437c35637387',
// 		    'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
// 	    }
//     };

//     try {
// 	    const response = await fetch(url, options);
// 	    const result = await response.text();
// 	    console.log(result);
//     } catch (error) {
// 	    console.error(error);
//     }
// }
// getRecipe();

// async function getRecipe1(){
//     const url = 'https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup';
//     const options = {
// 	    method: 'GET',
// 	    headers: {
// 		    'X-RapidAPI-Key': 'e0faed762bmsh60b9c6ae7e9fa90p165d20jsn437c35637387',
// 		    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
// 	    }
//     };

//     try {
// 	    const response = await fetch(url, options);
// 	    const result = await response.text();
// 	    console.log(result);
//     } catch (error) {
// 	    console.error(error);
//     }
// }
// getRecipe1(); // Only ingredients

var googleMapAPIKey = "AIzaSyDFfKtEpR4sFVJZEPpd4hkPhuRU6wmifGE";

// Initialize and add the map from Map JavaScript API https://developers.google.com/maps/documentation/javascript
let map;

async function initMap(lat,lng,title) {
  // The location of Uluru
  const position = { lat: lat, lng: lng };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 15,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: title,
  });
}

initMap(55.953252,-3.188267,"Edinburgh"); //Default location, just because I like Edinburgh

// When the user enters the name of a dish, the restaurants/ bakeries with that dish will appear on the browser
// Will the user need to enter a "location" into the input? - Perhaps try this option first, or the browser will get the approximate device location based on cell towers and WiFi nodes - Geolocation
// Geolocation seems to be a bit more complicated, let's try that later

var userAddress = "24%20Sussex%20Drive%20Ottawa%20ON";
var geoCodingURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + userAddress + "&key=" + googleMapAPIKey;

fetch(geoCodingURL)
.then(function(response){
  return response.json();
}).then(function(data){
  console.log(data);
}) // Pass the lat and long values from the geoCoding into the Marker function

var locationInputEl = document.getElementById('location-search-input');
var locationBtnEl = document.getElementById('location-search-button');

locationBtnEl.addEventListener('click',function(e){
  e.preventDefault();

  var locationInputText = locationInputEl.value.trim();
  var geoCodingURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locationInputText + "&key=" + googleMapAPIKey;

  fetch(geoCodingURL)
  .then(function(response){
    return response.json();
  }).then(function(data){
    console.log(data);
    console.log(data.results[0].geometry.location.lat);
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var title = data.results[0].formatted_address;

    initMap(lat,lng,title);
  })

})