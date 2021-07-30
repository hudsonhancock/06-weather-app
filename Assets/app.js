$( document ).ready(function() {
    console.log( "ready!" );

    var iconsUrl = 'https://openweathermap.org/img/w/04d.png'




    var searchInput = $('#s_input');
    var getWeatherBtn = $('#search_btn')


    getWeatherBtn.on("click", function() {
        // console.log('hello');   
        var cityName = searchInput.val();
        console.log(cityName);

        var nameUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=b0c3f4f604e973f7f3d93e23a6fba2eb&units=imperial&cnt=8';

        
        fetch(nameUrl)
        .then(function (response) {
            if (!response.ok){
                throw Error("There's been a boo boo");
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var cityNameText = data.city.name
            console.log(cityNameText);
            $('#selected_city').text(cityNameText + ' ');

            $('#history_container').append('<button class="btn" data-city="' + cityNameText + '" id="s_history_btn">' + cityNameText + '</button>');
            
            var lat = data.city.coord.lat;
            console.log(lat);
            var lon = data.city.coord.lon;
            console.log(lon);
            
            var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=b0c3f4f604e973f7f3d93e23a6fba2eb&units=imperial';
                    fetch(requestUrl)
                        .then(function (response) {
                             if (!response.ok){
                                throw Error("There's been a boo on ONECALL");
                            }
                             return response.json();
                        })
                            .then(function(data) {
                                var date = new Date(data.daily[0].dt * 1000);

                                $('#current_date').text(date.toLocaleString().substr(-21, 9));

                                console.log(data);
                                $('#temp').text(data.daily[0].temp.day + '°F');
                                $('#wind').text(data.daily[0].wind_speed + ' MPH');
                                $('#humidity').text(data.daily[0].humidity + ' %');
                                $('#uv').text(data.daily[0].uvi + '+');

                                $('section.hide').removeClass('hide');

                                // console.log(data.daily[2].dt);


                                for(i = 1; i < 5; i++){
                                    var milliseconds = new Date(data.daily[i].dt * 1000);
                                    
                                    var futureDate = milliseconds.toLocaleString().substr(-21, 9)

                                    var futureTemp = data.daily[i].temp.day;
                                    var futureWindSpeed = data.daily[i].wind_speed;
                                    var futureHumidity = data.daily[i].humidity;

                                    $('.container').append('<div class="card"><h4 id="fd">' + futureDate + '</h4><i class="fas fa-cloud-showers-heavy"></i><p id="ft">' + futureTemp + '°F</p><p id="fw">' + futureWindSpeed + ' MPH</p><p id="fh">' + futureHumidity + '%</p></div>');
                                }

                                
                        });

                        $('#s_history_btn').on('click', function(){
                            
                        })

                

               


            })

    })


    






    
    // function getWeather(){  

    //     fetch(requestUrl)
    //             .then(function (response) {
    //                 if (!response.ok){
    //                     throw Error("ERROR")
    //                 } 
    //                 return response.json();
    //               })
    //             .then(function (data) {
    //                 console.log(data);
                   
                     
    //                   });
    
    //                 }
    
    //                 getWeather();




                });

                







