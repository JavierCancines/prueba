
var passport = require('passport');

var express = require('express');
var app = express();

require('./configuration/passport')(passport);

app.set('port', (process.env.PORT || 4200));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//Rutas para la aplicacion
app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/login', function(request, response) {
  response.render('pages/login');
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect : '/',
            failureRedirect : '/'}));
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect : '/',
            failureRedirect : '/'}));

app.get('/signup', function(request, response) {
  response.render('pages/signup');
});


app.listen(app.get('port'), function() {
  console.log('Esta mrd esta corriendo en: ', app.get('port'));
});
