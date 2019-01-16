var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect(prescess.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });


// process.env.NODE_ENV === 'production'
// process.env.NODE_ENV === 'development'
// process.env.NODE_ENV === 'test'

mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });



module.exports = {
  mongoose
};