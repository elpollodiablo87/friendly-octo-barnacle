const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const  port = process.env.PORT || 3000

//Configuring paths
const public = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlbars
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)
hbs.registerHelper('year', () => {
    return new Date().getFullYear()
})

//Setting the static dir
app.use(express.static(public))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohamed'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mohamed'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page', 
        message: 'lorem ipsum',
        name: 'Awadallh'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geoCode(req.query.address, (error, data) => {
        
        if (error) {
            return res.send({
                error
            })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location: data.location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help article not found!',
        title: 'Error',
        name: 'Mohamed'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: '404',
        title: 'Error404',
        name: 'Mohamed'
    })
})

app.listen(port, () => {
    console.log(`server is up at port ${port}`);
    
})