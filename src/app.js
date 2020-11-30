const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast =require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname,'../public')) 

const app = express()
const port = process.env.PORT || 3000

// Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

// Define paths for express config
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // to set handle bars
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App',
        name:'Krishna'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About App',
        name:'Krishna'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help App',
        name:'Krishna'
    })
})
// app.get('',(req, res) => {
//     res.send('<h1>Welcome Express</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send({
//         name:'krishna',
//         age:24
//     })
// })
// app.get('/about', (req,res) => {
//     res.send('about page')
// })

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:"Please provide an address to display weather"
        })
    }
    forecast(req.query.address, (error, forecastdata) => {
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastdata,
            address:req.query.address
        })
    })
    
})
app.get('/products', (req,res) => {
 if(!req.query.search){
   return  res.send({
         error:'You must provide a search term'
     })
 }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {  //it should come last
    res.send('Help article not found')
})

//app.com
//app.com/help
//app.com/about

app.get('*', (req, res) => {  //it should come last
    res.render('404', {
        title:'404',
        name:'Krishna',
        errorMessage:'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})