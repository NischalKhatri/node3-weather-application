const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 //provided by process environment when hosted OR 3000 locally

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nick Khatri'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nick Khatri'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Please contact us for any help needed.',
        title: 'Help',
        name: 'Nick Khatri'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, { weatherDescription, temperature, feelsLike, humidity } = {}) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                weatherDescription: weatherDescription,
                temperature: temperature,
                feelsLike: feelsLike,
                location,
                address: req.query.address,
                humidity
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: '404 Error',
        name: 'Nick Khatri'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        title: '404 Error',
        name: 'Nick Khatri'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '  + port + '.')
})