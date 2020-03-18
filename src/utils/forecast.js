const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/3d5efa5f57d3e50ad4ba6e6c3a5f0883/' +  encodeURIComponent(latitude) + 
     ',' + encodeURIComponent(longitude) + '?units=si&lang=en';
    
     request({url, json: true}, (error, {body}) => {
        
        const {error: forecastError, daily, currently} = body;
        
        if(error) {
            callback('Unable to connect to weather service', undefined); 

        } else if (forecastError) {
            callback('Unable to find location or another error occurred', undefined); 
        } else {
            const forecastString = daily.data[0].summary + " It is currently " + currently.temperature + " degrees out." 
                 + " The high today is " +   daily.data[0].temperatureHigh + " C" 
                 + " with a low of " + daily.data[0].temperatureLow + " C."
                 + " There is a " + parseFloat(currently.precipProbability) * 100  + "% chance of rain."
           
            callback(undefined, forecastString);
        }
    });
};



module.exports = forecast; 