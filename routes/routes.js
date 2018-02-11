var appRouter = function (app) {
  app.get("/", function(req, res) {
    var data = ({
      $.get('http://www.google.com' + name, function(response) {
        console.log(response);
      });
    });
    res.status(200).send(data);
  });
  });
}



module.exports = appRouter;