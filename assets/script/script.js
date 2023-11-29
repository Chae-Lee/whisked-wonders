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

var btnEl = document.getElementById("recipe-input-button");
var textAreaEl = document.getElementsByClassName("recipe-input");

var formEl = document.getElementsByClassName("user-input");

formEl.addEventListener("submit",function(e){
    e.preventDefault();
    getRecipe(e.value.trim());

})

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

