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
      console.log('Connected succesfully');
      const db = database.db(process.env.CosmosDB);
      db
        .collection('Puppies')
        .find()
        .toArray((err, result) => {
          if (err) throw err;
          console.log('retrieved succesfully');
          result.forEach(puppy => delete puppy._id);
          context.res = {
            status: 200,
            body: result
          };
          database.close();
          context.done();
        });
    }
  );
};
