const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express()
const port = process.env.PORT || 3000;

app.set('view engine' , 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname));

// app.use((req , res , next) => {
// res.render('maintanence.hbs');
// });

app.use((req , res , next) => {
  var now = new Date().toString();
  var log = (`${req.method},${now},${req.url}`);

  fs.appendFile('server.log' , log + '\n' , (err) => {
    return new Error('Failed to enter into the server log');
  })
  next();
});


hbs.registerHelper('getCurrentYear' , () => {
  return new Date().getFullYear();
});

app.get('/' , (req , res) => {
  res.render('home.hbs', {
    pageTitle : 'Home Page'
  });
});

app.get('/about' , (req , res) => {
  res.render('about.hbs', {
    pageTitle : 'About Page'
  });
});

  app.listen(port , () => {
  console.log(`Server start up at ${port}`);
});
