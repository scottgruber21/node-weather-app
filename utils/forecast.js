const request = require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=68bdaef5bdb6c1b9e65f029f41d9e7bd&query=${long},${lat}&units=f`

  request({url, json: true}, (err, {body}) => {
      if(err){
        callback('An error has ocurred', undefined)
      }
      else if(body.error){
        console.log(url)
        callback('Location not found', undefined)
      }
      else{
        callback(null, body.current)
        
      }
  })
}

module.exports = forecast