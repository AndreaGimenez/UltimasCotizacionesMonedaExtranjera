const API_PORT = 3001;
const express = require('express');
const app = express();
var request = require('request');
var cors = require('cors');
var concat = require('async/concat');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var monedas = ['USD', 'EUR', 'BRL', 'GBP', 'BTC']

var url_primera_parte = "http://api.cambio.today/v1/quotes/";
var url_segunda_parte = "/ARS/json?qty=1&key=";
const apikey = "1960|g9Bg^sXkr*ET0*g*m4izoqLErXpVT6JD";

app.get('/cotizaciones/USD', (req, res) => {

  getCotizaciones()
    .then((cotizaciones) => res.send({data: cotizaciones}))
    .catch((error) => res.send(error))
});

function getCotizaciones(){
  return new Promise((resolve, reject) => {
    concat(monedas, getCotizacion, function(error, cotizaciones){
      if(error){
        reject(error)
      }else{
        resolve(cotizaciones);
      }
    })
  })
}

function getCotizacion(moneda, callback){

    var url = url_primera_parte + moneda.toString() + url_segunda_parte + apikey;
    request(url, (error, response, body) => {
      if(!error && response.statusCode === 200){
        var data = JSON.parse(body);
        callback(null, data);
      }else {
        callback({status: response.statusCode, message: response.statusMessage});
      }
    });
}

// =====    START THE SERVER    =====
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
