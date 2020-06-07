const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibW9oYW1lZHphaHciLCJhIjoiY2thc2Rob205MDYzaDJ4cHR4amE3NXRvNyJ9.yvav7uI7HJ60W-WXr-D-2A`

    request({url, json: true}, (err, res) => {
        if (err) {
            return callback('Unable To connect!')
        } 
        const {body} = res
        const {features} = body
        if (features.length === 0) {
            callback('Unable to find location!')
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geoCode