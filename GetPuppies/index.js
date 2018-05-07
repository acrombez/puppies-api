const MongoClient = require('mongodb').MongoClient;
const auth = {
  user: process.env.CosmosDBUser,
  password: process.env.CosmosDBPass
};
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  context.res = {
    status: 200,
    body: context.bindings.puppies
  };
};
