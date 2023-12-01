/* Pseudocode
  1) When the button 'easy', 'medium', 'hard' is clicked then recipe under each categories are pulled and displayed on the page as a list 
    - addEventListner for the buttons 
    - API return data : iterate through the recipes and display matching the selected difficulty 
    - for loop so that this occurs for all levels of difficulty 
  2) When a recipe is selected the full recipe with the ingredients, methods and image displays 
    - on a separate page? or directly within the recipe html page
*/
// Testing out public APIs for recipes and drinks
var recipeAPI = 'https://the-birthday-cake-db.p.rapidapi.com/';
var apiKey = '637d11b810msh7d4930cc5d05c6ep1b0fcdjsnb524ebfaaff6';

fetch (recipeAPI)
  .then (function (response){
    return response.jason ();
  }) .then(function (data){
    console.log (data);
  })

// fetch (recipeAPI)
//   .then (response => {
//     if (!response.ok){
//       console.log (error);
//     }
//     return response.json();
//   })
//   .then (data=>{
//     console.log (data);
//   })
//   .catch (error => {
//     console.log (error);
//   })

// Confirmation that the API data can be fetched
var fetchData = async ()=>{
const url = 'https://the-birthday-cake-db.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '637d11b810msh7d4930cc5d05c6ep1b0fcdjsnb524ebfaaff6',
		'X-RapidAPI-Host': 'the-birthday-cake-db.p.rapidapi.com'
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

fetchData ();

