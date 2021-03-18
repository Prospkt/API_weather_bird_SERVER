const express = require("express");
const https = require("https");  //1.  no need to install a npm package because its native
const bodyParser = require("body-parser")   // require the body parser ( meaning the form on html)

const app = express();
app.use(bodyParser.urlencoded({extended: true}));   //using bodyParser


// Getting the index.html

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
  });


  app.post("/", function(req, res) {
const query = req.body.cityName;   //cityName as it was put on the html form
const id = "98fa3fd8c19f7b0876e61306c617f2af"
const unit = "metric"

const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" + id + "&units=" + unit   //2. the api original url taken out the parameters

https.get(url, function(response){  //3.  just put url up to make it in on line - also isntead of resp, put response

  console.log(response.statusCode);  //4. when get the response just log it - here is asking for the status code

  response.on("data" , function(data) {
    const weatherData = JSON.parse(data)  // this is what makes the information like seen on Postman - structure and clear
    const temperature = weatherData.main.temp   // this the attributes u want to display ( got the path from API VEWER PTO)
    const country = weatherData.sys.country
    const weatherdescrip = weatherData.weather[0].description
  const icon = weatherData.weather[0].icon  // icon p
  const imageURL= " http://openweathermap.org/img/wn/"+ icon + "@2x.png"  // URL provided from the website . Iocn put in the middle so it can grab the related image

// u can only have 1 res.send but u can have lotd of res.write

res.send( "<h3>the weather is currently " + weatherdescrip +  " </h3>  <h1>The temperature in " +query+ " is "  + temperature + " degrees Celsius </h1> <img src=" + imageURL +  "> " ); // the class code was not workingl to solve i took out the res.wrie and put everyhting on res.send

  })
  })
  })
// res.send("Server is up and running.")  //  these line cannot happen in the same time as another resp



app.listen(3000, function(){
console.log(" Server is running on the port 3000");

})
