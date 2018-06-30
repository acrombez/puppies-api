const MongoClient = require('mongodb').MongoClient;
module.exports = {
  connect: function(client, query, context) {
    const auth = {
      user: process.env.CosmosDBUser,
      password: process.env.CosmosDBPass
    };
    if (client == null) {
      MongoClient.connect(
        process.env.CosmosDBURL,
        { auth: auth }
      )
        .then(_client => {
          client = _client;
          query(client, context);
        })
        .catch(err => {
          context.log('Failed to connect');
          context.res = { status: 500, body: err.stack };
          context.done();
        });
    } else {
      query(client, context);
    }
  }
};
