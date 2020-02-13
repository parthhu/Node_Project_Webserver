const express = require("express");
const path = require("path");
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.set("view engine", 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirPath))
app.get('', (req, res) => {
    res.render('index', {
        title: "Home",
        name: 'Use this site to get wether location',
        createdby: "Parth"
    })
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: 'About Page',
        createdby: "Patel"
    })
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: 'Help Page',
        createdby: "lenovo"
    })
});
// app.get('/help',(req, res)=>{
//     res.send("<h1>Help Page</h1>")
// });
// app.get('/about',(req, res)=>{
//     res.send('<h1>About us Page</h1>')
// });
app.get('/wether', (req, res) => {
    let address= req.query.address;
    if(!address){
        res.send({
            error: 'Please Provide Address',
        })
    }else{
        geocode(address, (error, { latitude, longitude, place }={}) => {
            console.log(error)
            if (error) {
                return res.send({
                    error: error
                })
            }
            forecast(latitude, longitude, place, (error, data) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    forcast: data,
                    location:place,
                    address:address,
                    latitude:latitude,
                    longitude:longitude
                })
            });
        });
    }
    

   
});

app.get('/product', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    // res.send('My 404 not found');
    res.render('404', {
        error: "help article not found",
        title: '404',
        name: "lenovo"
    })
})
app.get('*', (req, res) => {
    // res.send('My 404 not found');
    res.render('404', {
        error: "Your page is not found",
        title: '404',
        name: "lenovo"
    })
})
app.listen(3000, () => {
    console.log("port 3000 is working")
})