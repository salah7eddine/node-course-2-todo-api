const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');
const { todos, poulateTodos, users, populateUsers} = require('./seed/seed')


// beforeEach(populateUsers);
beforeEach(poulateTodos);





describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200).expect((res) => {
        expect(res.body.text).toBe(text);
      }).end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todod with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app).get('/todos').expect(200).expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    console.log(todos);
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should retutn 404 if todo not found', (done) => {
    //make sure you get a 404 back
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should retutn 404 for non-object ids', (done) => {
    //make sure you get a 404 back

    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err) {
          done(err);
        }

        // query database using findById toNotExist
        // expect(null).toNotExist(); 
        Todo.findById(hexId).then((todo) => {
          expect(todo).not.toBeTruthy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);  
  });

  it('should return 404 if object id is invalid', (done) => {
      request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    // grab id of first item 
    // update text, set completed true
    // 200
    // text is changed, completed is true, completedAt is a number .toBeA

    var hexId = todos[0]._id.toHexString();
    var text = 'This should be the new Text';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text,
        completed:true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    // grab id of second todo item 
    // update text, set completed to false
    // 200
    // text is changed, completed false, completedAt is null .toNotExist

    var hexId = todos[1]._id.toHexString();
    var text = 'This should be the new Text !!!';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text,
        completed:false
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toEqual(null);
      })
      .end(done);

  });
  
});
