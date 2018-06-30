const conn = require('./../shared/utils');
let client = null;
module.exports = function(context) {
  conn.connect(
    client,
    query,
    context
  );
  function query(client, context) {
    const db = client.db('admin');
    const puppy = ({ id, name, saying } = context.req.body);
    db.collection('Puppies')
      .findOneAndUpdate(
        { id: context.req.params.id },
        { id: puppy.id, name: puppy.name, saying: puppy.saying }
      )
      .then(puppy => {
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
