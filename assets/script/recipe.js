/* Pseudocode
  1) fetch all the data from the birthday cake API
  2) write a for loop to iterate through the recipe and distribute into 3 arrays 'easy', 'medium' and 'hard'
    - global array 
  3) When the button 'easy', 'medium', 'hard' is clicked then recipe under each categories are pulled and displayed on the page as a list 
    - addEventListener for the buttons 
    - API return data : iterate through the recipes and display matching the selected difficulty 
    - for loop so that this occurs for all levels of difficulty 
  4) When a recipe is selected the full recipe with the ingredients, methods and image displays 
    - on a separate page? or directly within the recipe html page
*/
// // Testing and Confirmation that the API data can be fetched
var fetchData = async ()=>{
const url = 'https://the-birthday-cake-db.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '637d11b810msh7d4930cc5d05c6ep1b0fcdjsnb524ebfaaff6',
		'X-RapidAPI-Host': 'the-birthday-cake-db.p.rapidapi.com'
	}
};
// //try catch statement that can be used to pull the data from the API
// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }}

fetch (url, options)
  .then (function(response){
  return response.json ();
}).then (function(data){
  console.log (data);
})
};

fetchData ();

//Variables 
var easy =[];
var medium = [];
var hard = [];

for (var i=0; i<fetchData.length; i++){
  console.log (i);
}