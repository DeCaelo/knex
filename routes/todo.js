var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

/* This router is mounted at http://localhost:3000/todo */
router.get('/', (req, res) => {
  knex('todo')
    .select()
    .then(todos => {
      res.render('all', { todos: todos });
    });
});

// new todo route
router.get('/new', (req, res) => {
  res.render('new');
});

// create new todo
router.post('/', (req, res) => {
  validateTodoRenderError(req, res, (todo) => {
    todo.date = new Date();
    // insert into the database
    knex('todo')
      .insert(todo, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/todo/${id}`);
      });
  });
});

function validateTodoRenderError(req, res, callback) {
  if(validTodo(req.body)) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority
    };

    callback(todo);
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid todo'
    });
  }
}

function validTodo(todo) {
  return typeof todo.title == 'string' &&
          todo.title.trim() != '' &&
          typeof todo.priority != 'undefined' &&
          !isNaN(todo.priority);
}

module.exports = router;
