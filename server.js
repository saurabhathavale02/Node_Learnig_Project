const express=require('express');
//require handle bar
const hbs = require('hbs');
//File use
const fs = require('fs');
//port
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() => {
  return  new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine','hbs');

app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n', (err) => {
    if(err)
    {
      console.log('unable to open the server.log file');
    }
  });
  next();
});
/*
app.use((req,res,next) => {
  res.render('maintainance.hbs');
});
*/

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
  //res.send('<h1> hello express </h1>');
  //res.send(Name
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeData: 'Welcome to Saurabh website'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});


app.get('/bad',(req,res) => {
     res.send(
       {
         Error: "Bad Url"
       });
});

var Name= [];
Name.push(
  {
    name:'SAURABH',
    likes:['b','t']
  }
);

Name.push(
  {
    name:'Tarun',
    likes:['g']
  }
);

app.listen(port,() => {
  console.log('server is up on port ='+port);
});
