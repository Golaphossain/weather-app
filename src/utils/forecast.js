const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/cc99dbd8bdd6a46b406ebaed7e3be57d/'+latitude+','+longitude;
    request({url,json:true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out.this is high today is '+body.daily.data[0].temperatureHigh+'with a low of'+body.daily.data[0].temperatureLow +'. There is a ' + body.currently.precipProbability + '% chance of rain.')            
        }
    })
}
module.exports=forecast
