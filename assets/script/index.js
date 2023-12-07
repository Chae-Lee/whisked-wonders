var recipeButton = document.getElementById('recipeButton');
var locationButton = document.getElementById('locationButton');

// Buttons for the landing page to link up to each recipe and location pages 
recipeButton.addEventListener('click', () => {
  window.location.href = "./recipe.html"
});
locationButton.addEventListener('click', () => {
  window.location.href = "./location.html"
});