var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(prescess.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });


module.exports = {
  mongoose
};