const API_PORT = 3001;
const express = require('express');
const app = express();
var request = require('request');

var cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/cotizaciones/USD', (req, res) => {
  const apikey = "1960|g9Bg^sXkr*ET0*g*m4izoqLErXpVT6JD";
  var url = "http://api.cambio.today/v1/quotes/USD/ARS/json?qty=1&key=" + apikey;
  request(url, (error, response, body) => {
    var data = JSON.parse(body);
    if(error){
      res.send(error);
    } else {
      res.send({data: data});
    }
  });
});


// =====    START THE SERVER    =====
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
