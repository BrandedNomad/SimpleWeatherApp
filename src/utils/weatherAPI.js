const request = require('request');
const location = require('./coordinatesAPI');

function getForcast(place, callback){


    location.getCoordinates(place,(e,{lat,long,locationName}={})=>{

        if(e){
            callback(e)
        }else{
            const base = 'https://api.darksky.net/forecast/';
            const key = '59d116abe053214a7c83d99b0e2d223f/';
            const endpoint = base + key + long + "," +  lat;
            console.log(endpoint)

            request({url:endpoint, json:true},(error,{body})=>{
                if(error){
                    callback("Unable to connect to the weather api")
                } else if(body.error){
                    callback("code: " + body.code + " " + body.error)
                } else {
                    const current = body.currently;
                    const wMessage = "Today will be " + current.summary + " with a temperature of " + current.temperature + " and a " + current.precipProbability +  " percent chance for rain.";
                    const returnData = {
                        location:locationName,
                        message:wMessage
                    };
                    callback(returnData);
                    // console.log()
                    // console.log(locationName);
                    // console.log("Today will be " + current.summary + " with a temperature of " + current.temperature + " and " + current.precipProbability +  " percent chance for rain")
                }

            });
        }

    })


}

module.exports=getForcast;