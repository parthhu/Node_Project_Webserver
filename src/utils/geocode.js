const request = require("request");

const geoCode = (city,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(city)+".json?access_token=pk.eyJ1IjoicGFydGhwYXRlbCIsImEiOiJjazZieWVmamIweWd5M2xyeTIwYXN3bGJzIn0.Jw2Q5YZ3P3Vw6pKgKF1Skw&limit=1";
    
   
    request({ url, json: true }, (error, {body}={}) => {
    //    console.log(body)
       if (error) {
           // console.log("unable to connect mapbox");
           callback("unable to connect mapbox",undefined)
       } else if (body.features.length == 0) {
           // console.log("unable to find location");
           callback("unable to connect mapbox please enter valid city",undefined)
       } else {
           // console.log(response.body.features[0].center[1])
           // console.log(response.body.features[0].center[0]);
           const data = {
               latitude:body.features[0].center[1],
               longitude:body.features[0].center[0],
               place:body.features[0].place_name
           }
           callback(error,data);
       }
   
   })
   }

   module.exports  = geoCode;