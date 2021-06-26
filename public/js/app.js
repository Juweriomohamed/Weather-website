
(function($, document, window){
	
	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});

		var map = $(".map");
		var latitude = map.data("latitude");
		var longitude = map.data("longitude");
		if( map.length ){
			
			map.gmap3({
				map:{
					options:{
						center: [latitude,longitude],
						zoom: 15,
						scrollwheel: false
					}
				},
				marker:{
					latLng: [latitude,longitude],
				}
			});
			
		}
	});

	$(window).load(function(){

	});

})(jQuery, document, window);


const weatherform = document.querySelector('form')
const search = document.querySelector('#input')
const loads = document.querySelector('#loads')
const cityname = document.querySelector('.location')
const tempreture = document.querySelector('.num')
const rainy = document.querySelector('.rainy')
const wind_speed = document.querySelector('.wind')
const weather_desc = document.querySelector('.description')
const date = document.querySelector('.date')
const days = document.querySelector('.day')
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;
console.log(today);
var day = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var theday = weekday[day.getDay()];
console.log(theday);
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    loads.textContent = "Loading...."
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        search.value='' 
        response.json().then((data)=>{
            if (data.error) {
               loads.textContent = data.error
            //    messagetwo.textContent = ''
            }
            else{
			loads.textContent = null
             cityname.textContent = data.location
             tempreture.textContent = data.tempreture	
             rainy.textContent = data.rainy+" %"
             wind_speed.textContent = data.wind+" %"
             weather_desc.textContent = data.description
             date.textContent = today
             days.textContent = theday
            }
           
        })
       
    })
   
})






