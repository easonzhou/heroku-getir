const config = require('./config'),
      bodyParser = require('body-parser'),
      express = require('express'),
      createRepo = require('./repo'),
      database = require('./db'),
      app = express();

app.use(bodyParser.json({ type: () => true }));

database(config.mongo.connection_string)
  .then((db) =>{
    const options = {
      repo: createRepo(db)
    };

    require('./api/record')(app, options);
    return app.listen(config.port);
  }).then(() => {
    console.log(`Started listening on port ${config.port}.`);
  }).catch((err) => {
    console.log("Couldn't start the application:", err);
  });
