var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon='lon + '&appid=b0c3f4f604e973f7f3d93e23a6fba2eb&units=imperial';

var lat =  
var lon = 



updateUrl()
//Update URL based on user input

function updateUrl(){

}






fetch(requestUrl)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data)
    })


   //Use 'units = imperial' Fahrenheit
   
   var date = new Date(1627570800 * 1000);
   console.log(date.toUTCString())