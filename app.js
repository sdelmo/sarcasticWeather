const express = require("express"); // import express
const https = require("https");
const bodyParser = require("body-parser");
const app = express(); // instantiate express application

app.use(bodyParser.urlencoded({ extended: true }));
// What the server does when a get req is made to port 3000
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  // Make a https request to the url, and log response to console
});

// We listen on port 3000 for any requests
app.listen(3000, function () {
  console.log("server started");
});

// Post a response to the request
app.post("/", function (req, res) {
  var city = req.body.city;
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=2cc5a9e6a285233f7c055b526c1273a4";
  https.get(url, function (response) {
    console.log(response.statusCode);

    // when data comes in, it logs it to console
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const WeatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      var fpath = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<p>The weather is currently too cold for me, but since you're asking, it's " +
          WeatherDescription +
          "</p>"
      );
      res.write(
        "<h1>And the temperature in " +
          city +
          " is " +
          temp +
          " degrees Celsius. </h1>"
      );
      res.write("<img src='" + fpath + "'>");
      res.send();
    });
  });
});
