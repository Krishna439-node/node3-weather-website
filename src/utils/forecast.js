const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b14e150613be351d79d87ba60180cb3c&query='+ address + '&units=f'
    request({url:url, json:true},(error, response) => {
        if(error){
            callback("unable to connect to weather service", undefined)
        }else if(response.body.error){
            callback("Unable to find location ", undefined)
        }else{
            callback(undefined, response.body.current.weather_descriptions[0]+". It is currently "+response.body.current.temperature+" degrees out. It feels like "+response.body.current.feelslike+" degrees out")
        }
    })
}
module.exports = forecast