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
      let puppyId = req.params.id;
      db
        .collection('Puppies')
        .findOneAndDelete({ id: puppyId }, (err, result) => {
          if (err) throw err;
          context.res = {
            status: 200,
            body: { message: 'Puppy deleted successfully!' }
          };
          database.close();
          context.done();
        });
    }
  );
};
