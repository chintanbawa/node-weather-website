const request = require('request')

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?&access_token=pk.eyJ1IjoiY2hpbnRhbmJhd2EiLCJhIjoiY2p6ZnMzb292MDBoNTNibWIxOHNvdGxvYiJ9.zvS1f8CNXC6LJ06o79HhBw&limit=1`

    request({ url, json: true }, (err, { body } = {}) => {
        if (err) return callback('Unable to connect to the location services')

        const { features } = body

        if (features.length === 0) return callback('Unable to get the location.')

        callback(undefined, {
            latitude: features[0].center[1],
            longitude: features[0].center[0],
            location: features[0].place_name
        })
    })
}

module.exports = geocode