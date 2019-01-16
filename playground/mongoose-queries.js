const {ObjectID} = require('mongodb');

const {mongoo} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var idUser = '5c3e0427fc9c3e38acff3b69'; 

// var id = '5c3e25ee0ecd5d2ca899e24a11'; for Todo

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }


// Todo.find({
//   _id: id
// }).then((todos)  => {
//   console.log('Todos', todos);
// });

// Todo.findOne ({
//   _id: id
// }).then((todo)  => {
//   console.log('Todo', todo);
// });


// Todo.findById(id).then((todo)  => {
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

User.findById(idUser).then((user) => {
  if(!user) {
    return console.log('user not found');
  }
  console.log('User By Id ', user);
}).catch((e) => console.log(e));