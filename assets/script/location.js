var googleMapAPIKey = "AIzaSyDFfKtEpR4sFVJZEPpd4hkPhuRU6wmifGE";
var map;
var newPlace = {lat: 55.953252, lng: -3.188267} // Default location for the map

var locationInputEl = document.getElementById('location-search-input');
var locationBtnEl = document.getElementById('location-search-button');

var mapBoxAPIKey = "pk.eyJ1IjoiaGFwaGFubWFya3VzIiwiYSI6ImNscG56eDdjNTByMGIyanQzczRvZ3RyZm0ifQ.xc-W80Cv1QN_hWUug9_O9w";
var suggestPlaceEl = document.getElementById('suggested-place');

var availableDish = [
  "Raspberry and custard muffins",
  "Lemon and blackberry stripe cake",
  "Paul Hollywood’s chocolate fudge cake",
  "Lemon and strawberry meringue cake",
  "Vegan chocolate cake",
  "Spiced plum cake with swiss meringue frosting",
  "Lemon and courgette cake with white chocolate cream cheese frosting",
  "Chocolate cake with caramel poached pears and chocolate buttercream",
  "Rhubarb and custard layer cake",
  "Spring lamb cupcakes",
  "Peanut butter drip cake",
  "Ginger drizzle traybake with cream cheese icing",
  "Baked lemon cheesecake with pineapple flowers",
  "Carrot and cheesecake layer cake",
  "Sugarplum fairy cakes",
  "Summer-cup bundt drizzle cake",
  "St Clement’s squares",
  "Caramelised white chocolate, burnt butter and tahini cake",
  "Eric Lanlard’s carrot and pumpkin celebration cake",
  "Tunnock’s teacake traybake",
  "Easy butterfly cakes",
  "Chocolate cupcakes",
  "Orange blossom, lemon thyme and almond cake",
  "Eton mess traybake",
  "Nut-free carrot cupcakes",
  "Raspberry and lemon sponge cake",
  "Strawberry and rose victoria sponge sandwich",
  "Toffee ice-cream cake",
  "Easy flourless chocolate cake",
  "Sticky toffee pudding cake",
  "Frozen lemon and blueberry mousse cake",
  "Secret-ingredient chocolate bundt cake",
  "White forest gateau",
  "Ginger and honey biscuit cake with choc-orange icing",
  "Giant Jaffa cake",
  "Eric Lanlard’s clementine and pomegranate cake (gluten-free)",
  "Coconut and lime angel cake",
  "Daim bar layer cake",
  "Elderflower, lemon and cherry cream flourless cake",
  "Chetna Makan’s pistachio, cardamom and white chocolate cake",
  "Simple buttercream icing",
  "Chocolate porter cake",
  "Triple-chocolate layer cake",
  "Chocolate cola cake",
  "Gluten-free chocolate cake with raspberries",
  "Pop cakes",
  "Mary Berry’s malted chocolate cake",
  "Chocolate celebration layer cake",
  "Apple caramel layer cake",
  "Red velvet cake",
  "Paul Hollywood’s ultimate carrot cake",
  "Mary Berry’s very best chocolate and orange cake",
  "Classic sponge cake",
  "Gluten-free birthday cake sponge",
  "Ultimate chocolate mousse cake",
  "Lavender cupcakes",
  "Chocolate and berry traybake",
  "Easy coconut and chocolate cake",
  "Lemon and coconut cake"
]

// Initialize and add the map from Map JavaScript API https://developers.google.com/maps/documentation/javascript
async function initMap(lat = 55.953252,lng = -3.188267,setMarkersArr = []) {
  const position = { lat: lat, lng: lng };
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 15,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
  // The marker
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Hello World",
  });
  if (setMarkersArr.length == 0){
    return;
  } else {
    setMarkers(setMarkersArr,map);
  }
}

function setMarkers(places,map){
  for (let i = 0; i < places.length;i++){
    const pinBackground = new google.maps.marker.PinElement({
      background: "#FBBC04",
    }); // Add feature for the new marker. Each const pinBackground can only be used once for each marker, so it needs to be in the for loop.

    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: places[i],
      map,
      content: pinBackground.element
    })
    // console.log(marker);
  }
}

initMap(); //Default location, just because I like Edinburgh

locationBtnEl.addEventListener('click',function(e){
  e.preventDefault();
  var locationInputText = locationInputEl.value.trim();
  var geoCodingURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locationInputText + "&key=" + googleMapAPIKey;

  fetch(geoCodingURL)
  .then(function(response){
    return response.json();
  }).then(async function(dataGeoCode){
    console.log(dataGeoCode);
    var latNewPlace = await dataGeoCode.results[0].geometry.location.lat;
    var lngNewPlace = await dataGeoCode.results[0].geometry.location.lng;
    var title = dataGeoCode.results[0].formatted_address;

    var mapBoxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + "cake&coffee&bakery" + ".json?type=poi" + "&access_token=" + mapBoxAPIKey + "&bbox=" + (lngNewPlace-0.15) + "," + (latNewPlace-0.072609293) + "," + (lngNewPlace+0.15) + "," + (latNewPlace+0.072609293) + "&limit=10"; //availableDish[10].replace(/ /g,"%20")

    fetch(mapBoxURL)
    .then(function(response){
      return response.json()
    }).then(function(dataMapBox){
      console.log(dataMapBox);

      var places = []; // Array to store coordinates for all returned places
      suggestPlaceEl.innerHTML = ""; // Clear inside the element upon the new search
      var placeNumber = 0;
      for (let i = 0; i< dataMapBox.features.length;i++){
        placeNumber++;
        var cardEl = document.createElement('div');
        suggestPlaceEl.appendChild(cardEl);
        cardEl.classList.add('card','mb-2');

        var cardBodyEl = document.createElement('div');
        cardEl.appendChild(cardBodyEl);
        cardBodyEl.classList.add('card-body','m-0');

        var placeHeader = document.createElement('h5');
        placeHeader.innerHTML = dataMapBox.features[i].text;
        // cardBodyEl.appendChild(placeNumber);
        cardBodyEl.appendChild(placeHeader);

        var address = document.createElement('p');
        address.innerHTML = "Address: " + dataMapBox.features[i].place_name;
        cardBodyEl.appendChild(address);
        
        var coordinates = {
          lat: dataMapBox.features[i].geometry.coordinates[1],
          lng: dataMapBox.features[i].geometry.coordinates[0]
        }
        places.push(coordinates);
      }
      console.log("Suggested places: " + places);

      initMap(latNewPlace,lngNewPlace,places);      
    })

    await searchNearbyAPI(latNewPlace,lngNewPlace);

    // var nearbySearchURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latNewPlace + "%2C" + lngNewPlace + "&radius=10000" + "&type=restaurant" + "&key=" + googleMapAPIKey;
    // console.log(nearbySearchURL);
    
    // fetch(nearbySearchURL,{mode: "no-cors"})
    //   .then(function (responseNearby) {
    //     console.log("hello", responseNearby);
    //     return responseNearby.json();
    //   }).then(function (dataNearby) {
    //     console.log("data retrieve: ",dataNearby);
    //   })
  })//.catch(function(error){
    // console.error(error);
  // })
})


async function searchNearbyAPI(lat,lng) {
  let nearbySearchURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "%2C" + lng + "&radius=5000" + "&type=restaurant" + "&key=" + googleMapAPIKey + "&pagetoken"; // 
  
  console.log("API link: ", nearbySearchURL);
  const response = await fetch(nearbySearchURL,{
    mode: "no-cors",
    headers:{
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(data),
  })
  console.log("data retrieve: ",response);
  // const jsonFile = await response.json();

  // console.log("data here: ", jsonFile);
  
  return response.json();

  // fetch(await nearbySearchURL,{mode: "no-cors"})
  //   .then(function (responseNearby) {
  //     console.log("hello", responseNearby);
  //     return responseNearby.json();
  //   }).then(function (dataNearby){
  //     console.log("data retrieve: ",dataNearby);
  //   })
}
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