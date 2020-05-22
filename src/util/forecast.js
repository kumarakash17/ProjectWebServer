const request=require('request')

const forecast=(latitude,longtitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=c6be39b13cc1f78826e7150334aed510&query='+latitude+','+longtitude+'&units=f'
    
    request({url:url,json:true},(error,response)=>{
        if(error){
            console.log('unable to connect to weather service',undefined)

        }else if(response.body.error){
            console.log('unable to find location',undefined)

        }else{
            callback('undefined',response.body.current.weather_descriptions[0]+'. it is currently '+response.body.current.temperature +' degree and it feels like '+response.body.current.feelslike+' degree')

        }
    }
    )
}

module.exports=forecast