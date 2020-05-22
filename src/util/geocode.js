const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYWthc2hrdW1hcmJ4ciIsImEiOiJjazlqMGJuNDYwZG95M2RxbHltcXRtbzUzIn0.HFltrPs_qDCYm2W6wrCsSw'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location services!',undefined)
        }
        else if(response.body.features.lenght===0){
            callback('unable to find location, try another search',undefined)

        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[0],
                longtitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            })

        }

        })

    }

    module.exports=geocode