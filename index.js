var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require("underscore");
var bobaDataUtil = require("./boba-data-util");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */
bobaDataUtil.restoreOriginalData();
var _DATA = bobaDataUtil.loadData().boba;

app.get('/', function (req, res) {
  res.render('home', {
    data: _DATA
  });
})

app.get('/CollegeParkBoba', function (req, res) {
  var cp = _.where(_DATA, { city: "College Park" })
  res.render('collegeparkboba', {
    data: cp
  });
})

app.get('/RandomBoba', function (req, res) {
  var rando = _.first(_.shuffle(_DATA))
  res.render('randomboba', {
    data: [rando]
  });
})

app.get('/BestBoba', function (req, res) {
  var maxrating = _.max(_DATA, function (boba) {
    return boba.rating;
  }).rating;
  var bestbobas = _.where(_DATA, { rating: maxrating })
  res.render('bestboba', {
    data: bestbobas
  });
})

app.get('/AlphabeticalBoba', function (req, res) {
  var alphabetical = _.sortBy(_DATA, function (boba) {
    return boba.name;
  })
  res.render('alphabeticalboba', {
    data: alphabetical
  });
})

app.get('/SelectCity', function (req, res) {
  var cities = _.pluck(_DATA, 'city')
  cities = _.uniq(cities)
  res.render('selectcity', {
    data: cities
  });
})

app.get('/SelectCity/:city', function (req, res) {
  var _city = req.params.city;

  var bobas = _.where(_DATA, { city: _city })
  res.render('city', {
    title: _city,
    data: bobas
  })
})

app.get('/AddNewBoba', function (req, res) {
  res.render('addnewboba', {
    data: _DATA
  });
})

app.get('/api/getBobaPlaces', function (req, res) {
  res.send(_DATA);
})

app.post('/AddNewBoba', function (req, res) {
  var body = req.body;

  body.flavors = body.flavors.split('\r\n')
  body.rating = parseFloat(body.rating)

  _DATA.push(req.body);
  bobaDataUtil.saveData(_DATA);
  res.redirect("/");
});

app.post('/api/AddNewBoba', function (req, res) {
  _DATA.push(req.body);
  bobaDataUtil.saveData(_DATA);
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening!');
});