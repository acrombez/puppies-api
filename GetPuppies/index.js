const MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://build-serverless.documents.azure.com:10255/?ssl=true';

module.exports = function(context, req) {
  const auth = {
    user: process.env.CosmosDBUser,
    password: process.env.CosmosDBPass
  };
  MongoClient.connect(
    process.env.CosmosDBURL,
    { auth: auth },
    (err, database) => {
      if (err) throw err;
      const db = database.db('admin');
      db
        .collection('Puppies')
        .find()
        .toArray((err, result) => {
          if (err) throw err;
          context.res = {
            body: result
          };
          database.close();
          context.done();
        });
    }
  );
};
