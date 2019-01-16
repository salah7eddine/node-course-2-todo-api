const {ObjectID} = require('mongodb');

const {mongoo} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');


// remove All
Todo.remove({}).then((result) => {
  console.log(result);
});

//Todo.findOneAndRemove()
//Todo.findByIdAndRemove()

// Todo.findOneAndRemove({_id: '5c3efba57799080373e925fa'}).then((todo) => {

// });


Todo.findByIdAndRemove('5c3efba57799080373e925fa').then((todo) => {
  console.log(todo);
});