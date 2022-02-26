//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
import request from 'request';

export const forecast = (latitude, longitude, callback) => {
    let url = `http://api.weatherstack.com/current?access_key=0012c1b467eb5c43a9e7e9d769c744d6&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback({ errormsg: 'Unable to connect to the weather service' }, undefined);
        } else {
            if (response.body.error) {
                callback({ errormsg: `Unable to find location due to error: ${response.body.error.info}.` }, undefined);
            } else {
                const { weather_descriptions, temperature, feelslike, visibility } = body.current;
                let desc;
                if (weather_descriptions.length > 1) {
                    desc = weather_descriptions.join(' .');
                } else {
                    desc = weather_descriptions.join(' .') + '.';
                }
                callback(undefined, `${desc} It is currently ${temperature} degress. It feels like ${feelslike} degrees. Visibility is ${visibility}.`)
            }
        }
    })
}
