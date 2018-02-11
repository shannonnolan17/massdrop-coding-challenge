var request = require('request');
var cheerio = require('cheerio');

var appRouter = function (app) {
  app.get("/", function(req, res) {
    // res.status(200).send("Welcome to our restful API");

  request('https://www.google.com', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      console.log(html);
    }
  });

    // res.status(200).send(data);
  });
  };




module.exports = appRouter;