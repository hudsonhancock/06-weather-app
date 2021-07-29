$( document ).ready(function() {
    console.log( "ready!" );

    

    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=34.077888&lon=-83.561546&appid=b0c3f4f604e973f7f3d93e23a6fba2eb&units=imperial';
    var dataSet = {};
    
        
    function getWeather(){ 
        fetch(requestUrl)
                .then(function (response) {
                    if (response.ok){
                        console.log('SUCCESS');
                    } else {
                        console.log('ERROR');
                    }
                    return response.json();
                  })
                .then(function (data) {
                    console.log(data);
                     




                      });
    
                    }

                    var city = 2;
                    var currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
                    var temp = "test";
                    var windSpeed = "test";
                    var humidity = "test";
                    var uvIndex = "test"


                    createCard(city, currentDate, temp, windSpeed, humidity, uvIndex);


                    function createCard(a,b,c,x,y,z,){
                          console.log('hello')
                          $('.current').add('<section class="current"><h1 id="today"><span id="selected_city">' + a + '</span><span id="current_date">' + b + '</span></h1><p>Temp: <span id="temp">' + c +'°F</span></p><p>Wind: <span id="wind">' + x + 'MPH</span></p><p>Humidity: <span id="humidity">' + y + '%</span></p><p>UV Index: <span id="uv">' + z + '</span></p></section>')
                      }


    



                    });







