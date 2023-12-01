var googleMapAPIKey = "AIzaSyDFfKtEpR4sFVJZEPpd4hkPhuRU6wmifGE";
var map;
var service;
var infowindow;
var locationInputEl = document.getElementById('location-search-input');
var locationBtnEl = document.getElementById('location-search-button');

// Initialize and add the map from Map JavaScript API https://developers.google.com/maps/documentation/javascript
async function initMap(lat,lng,title) {
  const position = { lat: lat, lng: lng };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

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

locationBtnEl.addEventListener('click',function(e){
  e.preventDefault();

  var locationInputText = locationInputEl.value.trim();
  var geoCodingURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locationInputText + "&key=" + googleMapAPIKey;

  fetch(geoCodingURL)
  .then(function(response){
    return response.json();
  }).then(function(dataGeoCode){
    console.log(dataGeoCode);
    // console.log(dataGeoCode.results[0].geometry.location.lat);
    var lat = dataGeoCode.results[0].geometry.location.lat;
    var lng = dataGeoCode.results[0].geometry.location.lng;
    var title = dataGeoCode.results[0].formatted_address;

    initMap(lat,lng,title);

    var nearbySearchURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "%2C" + lng + "&radius=10000" + "&type=restaurant" + "&key=" + googleMapAPIKey;
    console.log(nearbySearchURL);
    fetch(nearbySearchURL)
    .then(function(response1){
      return response1.json();
    }).then(function(dataNearby){
      console.log(dataNearby);
    })

  }).catch(function(error){
    console.error(error);
  })

  
})



// Test new API Text Search
// var locationInputText = locationInputEl.value.trim();

// fetch('https://places.googleapis.com/v1/places:searchText',{
//   method: "POST",
//   headers:{
//     "textQuery": locationInputText,
//     "Content-Type": "application/json",
//     "X-Goog-API-Key": googleMapAPIKey,
//     "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.priceLevel"
//   },
//   body: JSON.stringify({})
// })
//   .then(function(response){
//     return response.JSON();
//   }).then(function(data){
//     console.log(data);
//   }).catch(function(error){
//     console.error(error);
//   })


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








// When the user enters the name of a dish, the restaurants/ bakeries with that dish will appear on the browser
// Will the user need to enter a "location" into the input? - Perhaps try this option first, or the browser will get the approximate device location based on cell towers and WiFi nodes - Geolocation
// Geolocation seems to be a bit more complicated, let's try that later

// var userAddress = "24%20Sussex%20Drive%20Ottawa%20ON";
// var geoCodingURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + userAddress + "&key=" + googleMapAPIKey;

// fetch(geoCodingURL)
// .then(function(response){
//   return response.json();
// }).then(function(data){
//   console.log(data);
// }) // Pass the lat and long values from the geoCoding into the Marker function



// function nearbySearch(lat,lng) {
//   var nearbySearchURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters" + "&location=" + lat + lng;

// }

// https://developers.google.com/maps/documentation/places/web-service/search-nearby

// eample: https://maps.googleapis.com/maps/api/place/nearbysearch/json
// ?keyword=cruise
// &location=-33.8670522%2C151.1957362
// &radius=1500
// &type=restaurant
// &key=YOUR_API_KEYx

// service = new google.maps.places.PlacesService(map);
// service.nearbySearch(request,callback);