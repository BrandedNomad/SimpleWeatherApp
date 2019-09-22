const request = require('request');

const getCoordinates = (location, callback)=>{

    const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

    const place = encodeURIComponent(location);

    const JSONextension = '.json?';

    const token = 'access_token=pk.eyJ1IjoiY2hhcmxzd2FydCIsImEiOiJjazBpM2Zybm0wNmE1M21taXU2bHg5cXU4In0.FWQQwytgBh08MXAV95W4-g';

    const limit = '&limit=1';

    const endpoint= baseUrl + place + JSONextension + token + limit;

    request({url:endpoint, json:true},(error,response)=>{

        if(error){
            callback('error: Unable to connect to coordinate api',undefined)
        } else if(response.body.features.length === 0) {
            callback("Invalid location. Check your spelling or try searching another location", undefined);
        } else {
            const lat = response.body.features[0].geometry.coordinates[0];
            const long = response.body.features[0].geometry.coordinates[1];
            const locationName = response.body.features[0].place_name;
            //const data = [lat,long,locationName];
            const data = {
                lat,
                long,
                locationName
            };
            callback(undefined,data);
        }

    });


};

module.exports={
    getCoordinates:getCoordinates
};