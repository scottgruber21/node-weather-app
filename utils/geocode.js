const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2NvdHRncnViZXIyMSIsImEiOiJja280ZjNnczQwb2s5MzFwZGI3NGQzZzdiIn0.zNA7gGjrlAGcYUqVpEaWcQ&limit=1`

    request({url, json: true}, (err, {body}) => {
        if(err){
            callback('Unable to connect to location', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        }
        else{
            const {center, place_name} = body.features[0] 
            callback(undefined, {
                latitude: center[0],
                longitude: center[1],
                location: place_name
            })
        }
    })
}

module.exports = geocode