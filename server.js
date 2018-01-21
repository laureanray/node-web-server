const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000; // or 3000 if we run locally

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date()
})
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    res.render('index.hbs', {
        pageTitle: 'Welcome Pageee',
       
        welcomeMessage: 'Halloooo'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Pageee',
      
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fullfil kesme'
    })
});

app.listen(port, () => {
    console.log(`Server is up and running in ${port}`);

});