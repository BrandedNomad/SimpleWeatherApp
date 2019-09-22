const express = require('express');
const path = require('path');
const hbs = require('hbs');

const getForcast = require("./utils/weatherAPI.js");

const server = express();



//Setting up root directory for static files
const publicDirectoryPath = path.join(__dirname,'../public');
server.use(express.static(publicDirectoryPath));

//Setting up dynamic content handling

//setting up template engine handlebars
server.set("view engine","hbs");

//setting path for views (handlebars)
const viewsPath = path.join(__dirname,'../template/views');
server.set("views",viewsPath);

//setting path for partials
const partialsPath = path.join(__dirname,'../template/partials');
hbs.registerPartials(partialsPath);


//routes
server.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    getForcast(req.query.address, ({location,message})=>{
        res.send({
            location:location,
            forecast:message,
            address:req.query.address
        })
    });



});

server.get("",(req,res)=>{
    res.render('index',{ //render is used instead of send for serving dynamic content
        title:"Weather App",
        name:"Branded Nomad"
    });
});

server.get("/about",(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Branded Nomad"

    })
});

server.get("/help",(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Branded Nomad",
        message:"This is a help message!"
    })
});

server.get("/help/*",(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Branded Nomad',
        message:'Sorry. The help file you are looking for does not exist'
    })
});

server.get("*",(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Branded Nomad',
        message:'Sorry. The page you are looking for does not exist'
    })
});


//Set Port
server.listen(3000, ()=>{
    console.log('Server is up on port 3000')
});