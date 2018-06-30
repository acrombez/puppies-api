const conn = require('./../shared/utils');
let client = null;
module.exports = function(context) {
  conn.connect(
    client,
    query,
    context
  );

  function query(client, context) {
    let puppy = ({ id, name, saying } = context.req.body);
    const db = client.db('admin');

    db.collection('Puppies')
      .insertOne({
        id: puppy.id,
        name: puppy.name,
        saying: puppy.saying
      })
      .then(res => {
        context.res = {
          body: puppy
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
