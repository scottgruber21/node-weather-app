const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const path = require('path')
const hbs = require('hbs')
const request = require('request');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');



app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '..', 'templates', 'partials'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Scott'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        img: '/img/murphys.jpg',
        name: 'Scott Gruber'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help HBS render',
        name: 'Scott Gruber'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.json({error: 'No address provided'})
    }
    geocode(req.query.address, (err, {location, latitude, longitude} = {}) => {
        if(err){
            return res.json({error: 'No location found'})
        }
        forecast(longitude, latitude, (err, data) => {
            if(err){
                console.log(err)
                return res.send('Error!')
            }
            const {temperature, feelslike, weather_descriptions} = data
            res.json({location, temperature, feelslike, conditions: weather_descriptions[0]})
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if(!req.query.search){
        return res.json({error: 'No search term provided'})
    }
    res.json({products: [req.query.item]})
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page not found',
        name:'Scott Gruber'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Scott Gruber'
    })
})

app.listen(port, () => {
    console.log('Listening')
})