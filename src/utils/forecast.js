const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/6e699971d4ae716ccb61266e375c5f3e/${latitude},${longitude}?lang=en&units=si`

    request({ url, json: true }, (err, { body } = {}) => {
        if (err) return callback('Unable to connect to forecast services')

        if (err) return callback('Unable to get the location')

        const { daily, currently } = body

        callback(undefined, {
            summary: daily.data[0].summary,
            temperature: currently.temperature,
            precipProbability: currently.precipProbability
        })
    })
}

module.exports = forecast