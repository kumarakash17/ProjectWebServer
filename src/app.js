const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./util/geocode')
const forecast=require('./util/forecast')


const app=express()
const port=process.env.PORT || 3000

const viewsDir=path.join(__dirname,'../templates/views')
const publicDirectoryPath=path.join(__dirname,'../public')
const partialPath=path.join(__dirname,'../templates/partials')
app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')
app.set('views',viewsDir)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Akash'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide address'
        })
    }


    geocode(req.query.address,(error,{latitude,longtitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longtitude,(error,forecastData)=>{
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
        
    })
    //console.log(req.query.address)
    // res.send({
    //     forecast:"seems to rainy",
    //     location:req.query.address

    // })

})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'Akash',

    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"Akash",
        

    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Akash',
        errorMessage:'Help article not found'

    })
})


app.get('/about/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Akash",
        errorMessage:'About not found'

    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you must provice search term"
            
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Akash',
        errorMessage:'page not found'

    })
})

app.listen(port,()=>{
    console.log('server is up on port '+port)
})