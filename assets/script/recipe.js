var recipeId = 1;

var fetchData = async () => {
  var url = 'https://the-birthday-cake-db.p.rapidapi.com/' + recipeId;
  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '637d11b810msh7d4930cc5d05c6ep1b0fcdjsnb524ebfaaff6',
      'X-RapidAPI-Host': 'the-birthday-cake-db.p.rapidapi.com'
    }
  }

  fetch (url, options)
    .then (function (response){
      return response.json();
    }).then(function (data){
      console.log (data);
    })
  };

// try {
//   const response = await fetch(url, options);
//   const result = await response.text();
//   console.log(result);
// } catch (error) {
//   console.error(error);
// }

fetchData ();




