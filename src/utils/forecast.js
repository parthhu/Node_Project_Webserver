const request = require("request");

const geoCode = (lat, long, place, callback) => {

    const url = "https://api.darksky.net/forecast/669b1e038c460b66dc3d82b57f04df5f/" + lat + "," + long + "";

    console.log("forcast call")
    request({ url, json: true }, (error, { body } = {}) => {
        // console.log(response.body)
        if (error) {
            callback("unable to connect wether service!", undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'it is currently ' + body.currently.temperature + ' degrees out there is a ' + body.currently.precipProbability + '% chance of rain')
        }

    })
}

module.exports = geoCode;