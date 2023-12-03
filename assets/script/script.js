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
    - search the recipe by id
*/

//Variables 
var recipesByDifficulties;
var recipes;
var recipeEl = document.getElementById('recipeCards');
var recipeIndex = "";

// // Testing and Confirmation that the API data can be fetched
var fetchData = async () => {
  var url = 'https://the-birthday-cake-db.p.rapidapi.com/';
  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '637d11b810msh7d4930cc5d05c6ep1b0fcdjsnb524ebfaaff6',
      'X-RapidAPI-Host': 'the-birthday-cake-db.p.rapidapi.com'
    }
  };
  // //try catch statement that can be used to check that data can be pulled from the API
  // try {
  // 	const response = await fetch(url, options);
  // 	const result = await response.text();
  // 	console.log(result);
  // } catch (error) {
  // 	console.error(error);
  // }

  fetch(url, options)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      // console.log (data); // console.logs to ensure all relevant data is fetched correctly from the API
      // console.log (data[0].id);
      // console.log (data[0].title);
      // console.log (data[0].difficulty);
      // console.log (data[0].image);
      // console.log (JSON.stringify(data));
      for (var i=0; i<data.length; i++){
        data[i].difficulty=data[i].difficulty.toLowerCase();
        if (data[i].difficulty === 'a challenge') {
          data[i].difficulty = 'hard';
        }
      }

      recipesByDifficulties = Object.groupBy(data, function(recipe){
        return recipe.difficulty
      })
      console.log (recipesByDifficulties);

      recipeIndex = JSON.stringify(data); //to store the fetched data in a global variable
      // return recipeIndex;
      // List of recipes displayed on html page 
      
      for (var i = 0; i < data.length; i++) {
        var displayRecipes = document.createElement('li');
        displayRecipes.dataset.difficulty=data[i].difficulty;
        displayRecipes.innerHTML = data[i].title;
        recipeEl.appendChild(displayRecipes);
      }
      console.log(recipeIndex);
      recipesByDifficulty(data);

    })
};

fetchData();
console.log(recipeIndex); //currently not displaying as the console.log is executed before the data is fetched from API

// // Function to categorise recipes by difficulty
// function recipesByDifficulty(data) {
//   for (var i = 0; i < data.length; i++) {
//     var difficulty = data[i].difficulty.toLowerCase();
//     switch (difficulty) {
//       case 'easy':
//         easyRecipe.push(data[i]);
//         break;
//       case 'medium':
//         mediumRecipe.push(data[i]);
//         break;
//       case 'A challenge':
//         hardRecipe.push(data[i]);
//         break;
//     }
//   }
// }

sortBtn.addEventListener('click', function(event){
  if (!event.target.matches('button')){
    return
  }
  var difficulty = event.target.textContent.toLowerCase();
  console.log (difficulty);
  for (var i=0; i<recipeEl.children.length; i++){
    console.log (recipeEl.children[i]);
    if (recipeEl.children[i].dataset.difficulty === difficulty) {
      recipeEl.children[i].style.display = '';
    } else {
      recipeEl.children[i].style.display = 'none';
    }

  }
})

