const request = require('request')
const forecast = (lat,long,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&units=metric&appid=c820a96952673ac092f68f97a5144d8f' 
    request({url,json:true},(error,{body})=>{
        if (error) {
            callback("unable to connect, please check your internet")    
        }
        else if(body.message)
        {
            callback("unabel to find location")
        }
        else{
            callback(undefined,{
                tempreture:body.hourly[0].temp,
                rainy:body.hourly[0].pop,
                wind:body.hourly[0].wind_speed,
                description:body.hourly[0].weather[0].description})
        }
    })
}

module.exports = forecast