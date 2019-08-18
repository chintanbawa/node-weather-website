const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

const app = express();

const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'chintan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'chintan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'chintan'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) return res.send({
        err: 'Please provide address'
    })

    geocode(address, (err, { latitude, longitude, location } = {}) => {
        if (err) return res.send({
            err
        })

        forecast(latitude, longitude, (err, { summary } = {}) => {
            if (err) return res.send({
                err
            })

            res.send({
                forecast: summary,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'chintan',
        errorMessage: 'Help article  not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'chintan',
        errorMessage: 'Page not found.'
    })
})

// start up the server
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})