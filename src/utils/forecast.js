const request = require('request')
const forecast = (latitude , longitude , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=5ccf71616a7ff3a4214048790b89e8ab&query='+ latitude + ',' + longitude + '&units=f'
    request({url : url , json: true}  , (error , {body}) =>{
        if(error){
            callback('Unable to connect to the location services!' , undefined)
        }
        else if(body.error){
            callback('Unable to find location , Try another search' , undefined)
        }else{
            callback(undefined , body.current.weather_descriptions[0] + '.It is currently ' + body.current.temperature + ' degree outside it looks like ' + body.current.feelslike + ' degrees out.')

        }
    })
}
module.exports = forecast

 