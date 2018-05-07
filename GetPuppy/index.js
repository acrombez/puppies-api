module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  context.res = {
    body: 'loaderio-af1ba617a5b62b18338d281411017922'
  };
  context.done();
};
