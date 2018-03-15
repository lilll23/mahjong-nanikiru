module.exports = {
  context: __dirname + '/app',
  entry: {
    new: './new'
  },
  output: {
    path: __dirname + '/public/javascripts',
    filename: '[name].bundle.js'
  }
};