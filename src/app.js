const hbs=require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port=process.env.PORT || 3000

//Define path for express config
const publicDirctory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve up
app.use(express.static(publicDirctory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Golap hossain'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:"Golap"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Please give us feedback for update our service',
        title:'Help page',
        name:'Golap'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provie an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    // res.send('article not found')
    res.render('error',{
        title:'404',
        message:'Help article not found.',
        name:'Golap'
    })
})
app.get('*',(req,res)=>{
    // res.send('404 page')
    res.render('error',{
        title:'404',
        message:'Page not found',
        name:'Golap'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})