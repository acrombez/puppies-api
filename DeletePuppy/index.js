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
      .findOneAndDelete({ id: context.req.params.id })
      .then(res => {
        context.res = {
          status: 200,
          body: { message: 'Puppy deleted successfully!' }
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
