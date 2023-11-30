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

async function getRecipe(){
    const url = 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=brownie';
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'e0faed762bmsh60b9c6ae7e9fa90p165d20jsn437c35637387',
		    'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.text();
	    console.log(result);
    } catch (error) {
	    console.error(error);
    }
}
getRecipe();

async function getRecipe1(){
    const url = 'https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup';
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'e0faed762bmsh60b9c6ae7e9fa90p165d20jsn437c35637387',
		    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.text();
	    console.log(result);
    } catch (error) {
	    console.error(error);
    }
}
getRecipe1(); // Only ingredients

var googleMapAPIKey = "AIzaSyDFfKtEpR4sFVJZEPpd4hkPhuRU6wmifGE";

// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();