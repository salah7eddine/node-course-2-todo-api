var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/user', (req, res) => {
  console.log(req.body);
  var user = new User({
    email: req.body.email
  });

  user.save().then((user) => {
    res.send(user);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/todos', (req, res) => {
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});


// GET /todos:123123

// Valid id using isValid
  // 404 -send back empty body
app.get('/todos/:id', (req, res) =>{
  var id = req.params.id;
  
  if(!ObjectID.isValid(id)){
    return res.status(404).send({});
  }

  // findById 
    // success
      // if todod - send it back
      // if no todo - send back 404 with empyu body
    // error
      // 400 - and send empty body back

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.send('send back 404 with empty body');
    }
    res.send({todo});
  }).catch((e) => console.log(e));
    

});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {
  app
}