const conn = require('./../shared/utils');
let client = null;
module.exports = function(context, req) {
  conn.connect(
    client,
    query,
    context
  );

  function query(client, context) {
    const db = client.db('admin');

    db.collection('Puppies')
      .find()
      .toArray()
      .then(res => {
        context.log('This is a happy moment');
        res.forEach(puppy => delete puppy._id);

        context.res = {
          //status: 200,
          body: res
        };
        context.done();
      })
      .catch(err => {
        context.log('Failed to query');
        context.res = { status: 500, body: err.stack };
        context.done();
      });
  }
};
