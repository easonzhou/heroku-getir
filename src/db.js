const MongoClient = require('mongodb').MongoClient;

module.exports = (config) => {
  return MongoClient.connect(config);
};