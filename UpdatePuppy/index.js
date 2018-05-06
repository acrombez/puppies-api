const MongoClient = require('mongodb').MongoClient;
const auth = {
  user: process.env.CosmosDBUser,
  password: process.env.CosmosDBPass
};
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  MongoClient.connect(
    process.env.CosmosDBURL,
    { auth: auth },
    (err, database) => {
      if (err) throw err;
      const db = database.db('admin');
      let puppy = ({ id, name, saying } = req.body);
      let puppyId = req.params.id;
      db
        .collection('Puppies')
        .findOneAndUpdate(
          { id: puppyId },
          { set: { id: puppy.id, name: puppy.name, saying: puppy.saying } },
          (err, puppies) => {
            if (err) throw err;
            context.res = {
              body: puppy
            };
            database.close();
            context.done();
          }
        );
    }
  );
};
