const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/73ff9f848a72378ad6e4fe750fe70f2a/${lat},${long}?units=si`
    request({url, json: true}, (err, res) => {
        const {body} = res
        const {currently} = body
        if (err) {
            callback('Unable to connect!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, {
             summary : body.daily.data[0].summary,
             timeZone : body.timezone,
             temp : currently.temperature,
             rain : currently.precipProbability
            })
        }
    })
}

module.exports = forecast
