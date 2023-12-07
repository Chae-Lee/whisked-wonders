var googleMapAPIKey = "AIzaSyDFfKtEpR4sFVJZEPpd4hkPhuRU6wmifGE";
var map;
var newPlace = {lat: 55.953252, lng: -3.188267} // Default location for the map

var locationInputEl = document.getElementById('location-search-input');
var locationBtnEl = document.getElementById('location-search-button');

var mapBoxAPIKey = "pk.eyJ1IjoiaGFwaGFubWFya3VzIiwiYSI6ImNscG56eDdjNTByMGIyanQzczRvZ3RyZm0ifQ.xc-W80Cv1QN_hWUug9_O9w";
var suggestPlaceEl = document.getElementById('suggested-place');

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
  })
})


// var availableDish = [
//   "Raspberry and custard muffins",
//   "Lemon and blackberry stripe cake",
//   "Paul Hollywood’s chocolate fudge cake",
//   "Lemon and strawberry meringue cake",
//   "Vegan chocolate cake",
//   "Spiced plum cake with swiss meringue frosting",
//   "Lemon and courgette cake with white chocolate cream cheese frosting",
//   "Chocolate cake with caramel poached pears and chocolate buttercream",
//   "Rhubarb and custard layer cake",
//   "Spring lamb cupcakes",
//   "Peanut butter drip cake",
//   "Ginger drizzle traybake with cream cheese icing",
//   "Baked lemon cheesecake with pineapple flowers",
//   "Carrot and cheesecake layer cake",
//   "Sugarplum fairy cakes",
//   "Summer-cup bundt drizzle cake",
//   "St Clement’s squares",
//   "Caramelised white chocolate, burnt butter and tahini cake",
//   "Eric Lanlard’s carrot and pumpkin celebration cake",
//   "Tunnock’s teacake traybake",
//   "Easy butterfly cakes",
//   "Chocolate cupcakes",
//   "Orange blossom, lemon thyme and almond cake",
//   "Eton mess traybake",
//   "Nut-free carrot cupcakes",
//   "Raspberry and lemon sponge cake",
//   "Strawberry and rose victoria sponge sandwich",
//   "Toffee ice-cream cake",
//   "Easy flourless chocolate cake",
//   "Sticky toffee pudding cake",
//   "Frozen lemon and blueberry mousse cake",
//   "Secret-ingredient chocolate bundt cake",
//   "White forest gateau",
//   "Ginger and honey biscuit cake with choc-orange icing",
//   "Giant Jaffa cake",
//   "Eric Lanlard’s clementine and pomegranate cake (gluten-free)",
//   "Coconut and lime angel cake",
//   "Daim bar layer cake",
//   "Elderflower, lemon and cherry cream flourless cake",
//   "Chetna Makan’s pistachio, cardamom and white chocolate cake",
//   "Simple buttercream icing",
//   "Chocolate porter cake",
//   "Triple-chocolate layer cake",
//   "Chocolate cola cake",
//   "Gluten-free chocolate cake with raspberries",
//   "Pop cakes",
//   "Mary Berry’s malted chocolate cake",
//   "Chocolate celebration layer cake",
//   "Apple caramel layer cake",
//   "Red velvet cake",
//   "Paul Hollywood’s ultimate carrot cake",
//   "Mary Berry’s very best chocolate and orange cake",
//   "Classic sponge cake",
//   "Gluten-free birthday cake sponge",
//   "Ultimate chocolate mousse cake",
//   "Lavender cupcakes",
//   "Chocolate and berry traybake",
//   "Easy coconut and chocolate cake",
//   "Lemon and coconut cake"
// ]