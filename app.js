const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const place = req.body.city;
  const apiKey = "8a823d0048da666a11786ed30025a9c4";
  let unit;
  if (req.body.metric) {
    unit = "metric";
  } else if (req.body.imperial) {
    unit = "imperial";
  } else {
    unit = "metric";
  }
  const sayUnit = unit === "imperial" ? "Fahrenheit" : "Celcius";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=${unit}`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<h1>The weather is ${desc}</h1>`);
      res.write(
        `<h1>The temperature of ${place} is ${temp} degree ${sayUnit}.</h1>`
      );
      res.write(`<img src=${imgURL} >`);
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
