const express = require("express");
const https = require("https");
const { send } = require("process");

const app = express();

app.get("/", (req, res) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=bolpur&appid=8a823d0048da666a11786ed30025a9c4&units=metric";
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<p>The weather is ${desc}</p>`);
      res.write(
        `<h1>The temperature of bolpur is ${temp} degree celcius.</h1>`
      );
      res.write(`<img src=${imgURL} >`);
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
