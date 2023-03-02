const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const app = express()

// define path for a express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewpath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')
// setup handlers engine and view location jisse hm dynamic webpage banate hain....
app.set('views' ,viewpath)
app.set('view engine' , 'hbs')
hbs.registerPartials(partialsPath)
// setup static directory to serve.....
app.use(express.static(publicDirectoryPath))
app.get('' , (req , res)=>{
    res.render('index' , {
        title : 'Weather App', 
        name: 'Ujjwal Chauhan'
    })
})
app.get('/about' , (req , res)=>{
    res.render('about' , {
        title: 'About',
        name: 'Ujjwal Chauhan'
    })
})
app.get('/help' , (req , res)=>{
    res.render('help' , {
        helpText: 'this is some helpful text',
        title: 'HELP PAGE',
        name: 'Ujjwal Chauhan'
    })
})

app.get('/weather' , (req , res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address , function (error, { latitude, longitude, location } = {}) {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, ForecastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: ForecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    // res.send({
    //     forecast: 'It is sunny',
    //     location: 'NewYork',
    //     address: req.query.address
    // }
    // )
})

app.get('/products' , (req , res)=>{
    if(!req.query.search){
        return res.send({
            error: 'No query was provided'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*' , (req , res)=>{
    res.render('404' , {
        title: '404',
        name: 'Ujjwal Chauhan',
        ErrorMessage: 'Page not found'
    })
})
app.listen(3000 , ()=>{
    console.log('server is running on port 3000')
})