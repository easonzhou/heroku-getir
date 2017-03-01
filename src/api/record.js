const Joi = require('joi');

module.exports = (app, options) => {
  const { repo } = options;
  const schema = Joi.object({
    key: Joi.string().min(1).required()
  });

  // GET request method not allowed on records.
  app.get('/getRecord', (req, res) => res.json({ error: true, reason: "Get method not allowed! Please use POST." }));

  // Return valid records from the database, given a key.
  app.post('/getRecord', (req, res) => {
    const { error, validate } = Joi.validate(req.body, schema);
    const { key } = req.body;

    if(error) return res.json({ error: true, reason: error.message });

    repo.findRecordByKey(key)
      .then((results) => res.json(results || { error: true, reason: "Not found!" }))
      .catch((err) => res.json({ error: true, reason: err.message }));
  });
};