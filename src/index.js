const config = require('./config'),
      bodyParser = require('body-parser'),
      express = require('express'),
      app = express();

app.use(bodyParser.json({ type: () => true }));

app.get('/', (req, res) => res.json({ hello: 'world' }));
app.get('/getRecord', (req, res) => res.json({ message: "Get method not allowed! Please use POST." }));
app.post('/getRecord', (req, res) => res.json({ message: `We're print you back the request, you have sent us.`, body: req.body }));

app.listen(config.port, () => console.log(`Started listening on port ${config.port}.`));