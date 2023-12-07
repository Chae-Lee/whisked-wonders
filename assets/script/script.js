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
var recipeIndex;
var recipeMethodsEl = document.getElementById('recipe-methods');

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
  
  // //Error Handler - try catch statement that can be used to check that data can be pulled from the API
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
      console.log (data);
      /* console.logs to ensure all relevant data is fetched correctly from the API
      console.log (data); 
      console.log (data[0].title);
      console.log (data[0].difficulty); */
// converting the key into lowercase
      for (var i=0; i<data.length; i++){
        data[i].difficulty=data[i].difficulty.toLowerCase();
        if (data[i].difficulty === 'a challenge') {
          data[i].difficulty = 'hard'; //changing the difficulty key 'A Challenge' into 'hard' for ease of use.
        }
      }
// Filtering API based on their difficulty and adding to the global variable 
      recipesByDifficulties = Object.groupBy(data, function(recipe){
        return recipe.difficulty
      })
      // console.log (recipesByDifficulties);
      recipeIndex = JSON.stringify(data); //to store the fetched data in a global variable
      // console.log(recipeIndex);

// Displaying list of recipes on page (basic design)
      // for (var i = 0; i < data.length; i++) {
      // // Top level
      //   var displayRecipes = document.createElement('a');
      // // Inner level
      //   var displayRecipesContentTitle = document.createElement('p');
      //   var recipeTitle = data[i].title
      //   displayRecipesContentTitle.innerHTML = recipeTitle;

      //   var displayRecipesContentImage = document.createElement('img');
      //   var image = data[i].image
      //   displayRecipesContentImage.setAttribute("src", image);
      //   displayRecipesContentImage.setAttribute("width", 200);
      //   displayRecipesContentImage.setAttribute("height", 200);

      //   displayRecipes.dataset.difficulty=data[i].difficulty;
      //   // displayRecipes.innerHTML = data[i].title;
      //   displayRecipes.setAttribute("href", data[i].image);
        
      //   displayRecipes.appendChild(displayRecipesContentTitle);
      //   displayRecipes.appendChild(displayRecipesContentImage);

      //   recipeEl.appendChild(displayRecipes);
      // }

//Addition of Bootstrap cards elements and attributes to display all the recipes from the API (title, image, button)
      for (var i = 0; i < data.length; i++) {
        var container = document.createElement("div");
        container.setAttribute("class", "card");
        container.setAttribute("style", "width: 18rem;");
        container.dataset.difficulty = data[i].difficulty;
        
        var image = document.createElement("img");
        image.setAttribute("class", "card-img-top");
        image.setAttribute("src", data[i].image);
        image.setAttribute("alt", data[i].title);

        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        var header = document.createElement("h5");
        header.setAttribute("class", "card-title");
        header.textContent = "Card title"

        var paragraph = document.createElement("p");
        header.setAttribute("class", "card-text");
        header.textContent = data[i].title

        var buttonData = document.createElement("div")
        buttonData.setAttribute("class", "buttonStyle");

        var button = document.createElement("btn");
        // button.setAttribute("href", data[i].image)
        button.setAttribute("class", "btn btn-primary ");
        button.textContent = "See recipe"
        button.setAttribute ("data-recipe", data[i].id);


        buttonData.appendChild(button);
        container.appendChild(image);
        cardBody.appendChild(header);
        cardBody.appendChild(paragraph);
        cardBody.appendChild(buttonData);
        container.appendChild(cardBody);
        recipeEl.appendChild(container);

      }
    })
};

fetchData();
// console.log(recipeIndex); //currently not displaying as the console.log is executed before the data is fetched from API

// Adding functionality to the buttons on the page - filtering recipes based on their difficulty
sortBtn.addEventListener('click', function(event){
  if (!event.target.matches('button')){ //code to allow us to target only button elements from the html
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
});

// Function to pull the relevant recipe when a specific recipe button is clicked
recipeEl.addEventListener ('click', function (event){
  console.log (event.target);
  var recipeId = event.target.getAttribute ('data-recipe');
  console.log (recipeId);

  var url = 'https://the-birthday-cake-db.p.rapidapi.com/' + recipeId;
  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '637d11b810msh7d4930cc5d05c6ep1b0fcdjsnb524ebfaaff6',
      'X-RapidAPI-Host': 'the-birthday-cake-db.p.rapidapi.com'
    }
  };

//Pulling the full recipe data to display on the screen 
  fetch(url, options)
  .then(function (response) {
    return response.json();
  }).then(function(data) {
    console.log("this should return one recipe" , data);
    console.log(data.title);
//Creating individual elements to contain relevant recipe data
    var recipeCard = document.createElement('div');
    recipeCard.classList.add('card','mt-3');

    var recipeCardHeader = document.createElement('div');
    recipeCardHeader.classList.add('card-header');

    var recipeCardBody = document.createElement('div');
    recipeCardBody.classList.add('card-body');

    var recipeTitle = document.createElement('h5');
    recipeTitle.textContent = data.title;
    recipeTitle.setAttribute("class","card-title");

    var recipeMethod = document.createElement ('div');
    recipeMethod.textContent = data.method;

    var description = document.createElement ('div');
    description.textContent = data.description;

    var recipeImage = document.createElement ('img');
    recipeImage.setAttribute("src", data.image);
    recipeImage.setAttribute("style", "width: 18rem;");

    var recipeTime = document.createElement ('p');
    recipeTime.textContent = data.time;

    var recipePortion = document.createElement ('p');
    recipePortion.textContent = data.portion;

    var recipeIngredient = document.createElement ('p');
    recipeIngredient.textContent = data.ingredients;

    var ingredientList = document.createElement ('ol');

// For loop to access the array of data within the original data pulled 
    for (var i=0; i<data.ingredients.length; i++){
      var ingredientsLi = document.createElement ('li');
      ingredientsLi.textContent = data.ingredients[i];
      ingredientList.appendChild (ingredientsLi);
    }
// For loop to access the data in an object format which has different key value pairing 
    var methodList = document.createElement('ol'); 
    //this is to iterate through methods
    for(var j = 0; j < data.method.length; j++) {
      var recipeMethod = `${data.method[j][`Step ${j+1}`]}`;
      var methodLi = document.createElement('li');
      methodLi.textContent = recipeMethod;
      methodList.appendChild(methodLi);
    }

//Appending all the created elements to the div to display on the browser
    recipeMethodsEl.appendChild(recipeCard);
    recipeCard.appendChild(recipeCardHeader);
    recipeCard.appendChild(recipeCardBody);

    recipeCardHeader.appendChild (recipeTitle);

    recipeCardBody.appendChild (recipeImage);
    recipeCardBody.appendChild (recipePortion);
    recipeCardBody.appendChild (recipeTime);
    recipeCardBody.appendChild (description);
    recipeCardBody.appendChild (ingredientList);
    recipeCardBody.appendChild(methodList);

})
});

