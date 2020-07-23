var express = require('express');
var router = express.Router();

var pgp = require("pg-promise")(/*options*/);
var user = (process.env.DB_USER || 'geokids');
var pass = (process.env.DB_PASS || 'CmdL1n3-r0ck5');
var host = (process.env.DB_HOST || 'localhost');
var db_port = (process.env.DB_PORT || '5432');
var db_name = (process.env.DB_NAME || 'geokids');
var db = pgp(`postgres://${user}:${pass}@${host}:${db_port}/${db_name}`);

/* GET home page. */
router.get('/', function(req, res, next) {
  var continentsList = [];

  db.any("SELECT * FROM public.continents")
    .then(function (data) {
       for (var i = 0; i < data.length; i++) {
          var item = {
            'continent_id':data[i].continent_id,
            'continent':data[i].continent
          }
          continentsList.push(item);
      }

        console.log("DATA:", data);
        res.render('index', {name:'index', title: 'Home', 'continents': continentsList });
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
});

/* Regions by Continent. */
router.get('/regions/:id', function(req, res, next) {
  var regionsList = [];

  db.any("SELECT r.region_id, c.continent, r.region FROM public.regions r INNER JOIN public.continents c ON r.continent_id = c.continent_id  WHERE c.continent_id = " + req.params.id)
    .then(function (data) {
       for (var i = 0; i < data.length; i++) {
          var item = {
            'region_id':data[i].region_id,
            'continent':data[i].continent,
            'region':data[i].region
          }
          regionsList.push(item);
      }

        console.log("DATA:", data);
        res.render('regions', {name:'regions', title: 'Regions', 'regions': regionsList });
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
});

/* Countries by Region. */
router.get('/countries/:id', function(req, res, next) {
  var countriesList = [];

  db.any("SELECT co.country_id, co.country, c.continent, r.region FROM public.countries co INNER JOIN public.regions r ON co.region_id = r.region_id INNER JOIN public.continents c ON r.continent_id = c.continent_id WHERE r.region_id = " + req.params.id)
    .then(function (data) {
       for (var i = 0; i < data.length; i++) {
          var item = {
            'country_id':data[i].country_id,
            'country':data[i].country,
            'continent':data[i].continent,
            'region':data[i].region
          }
          countriesList.push(item);
      }

        console.log("DATA:", data);
        res.render('countries', {name:'countries', title: 'Countries', 'countries': countriesList });
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
});

router.get('/continents', function(req, res, next) {
  var continentsList = [];

  db.any("SELECT * FROM public.continents")
    .then(function (data) {
       for (var i = 0; i < data.length; i++) {
          var item = {
            'continent_id':data[i].continent_id,
            'continent':data[i].continent
          }
          continentsList.push(item);
      }

        console.log("DATA:", data);
        res.render('continents', {name:'continents', title: 'Home', 'continents': continentsList });
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
});

/* Regions by Continent. */
router.get('/regions', function(req, res, next) {
  var regionsList = [];

  db.any("SELECT r.region_id, c.continent, r.region FROM public.regions r INNER JOIN public.continents c ON r.continent_id = c.continent_id ")
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
          var item = {
            'region_id':data[i].region_id,
            'continent':data[i].continent,
            'region':data[i].region
          }
          regionsList.push(item);
      }

        console.log("DATA:", data);
        res.render('regions', {name:'regions', title: 'Regions', 'regions': regionsList });
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
});

/* Countries by Region. */
router.get('/countries', function(req, res, next) {
  var countriesList = [];

  db.any("SELECT co.country_id, co.country, c.continent, r.region FROM public.countries co INNER JOIN public.regions r ON co.region_id = r.region_id INNER JOIN public.continents c ON r.continent_id = c.continent_id")
    .then(function (data) {
       for (var i = 0; i < data.length; i++) {
          var item = {
            'country_id':data[i].country_id,
            'country':data[i].country,
            'continent':data[i].continent,
            'region':data[i].region
          }
          countriesList.push(item);
      }

        console.log("DATA:", data);
        res.render('countries', {name:'countries', title: 'Countries', 'countries': countriesList });
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
});


module.exports = router;
