import request from 'request';

export const geocode = (address, callback) => {
    const addressEncoded = encodeURIComponent(address.trim());
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressEncoded}.json?access_token=pk.eyJ1IjoiamRtdHJhbiIsImEiOiJja3hqZGhrN3IwYnI4MnZwY2VvZmV3M2syIn0.nf-SGLtSrGbj5YhvenpnbQ`;
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback({ errormsg: 'Unable to connect to the geo service' }, undefined)
        } else {
            if (body.message || body.features.length === 0) {
                callback({ errormsg: `Unable to find the location for address ${address}, please try a different location.` }, undefined)
            } else {
                const {place_name:place, center:coord} = body.features[0];
                callback(undefined, { place: place, latitude: coord[1], longitude: coord[0] });
            }
        }
    })
}