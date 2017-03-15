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

// new todo
router.get('/new', (req, res) => {
  res.render('new');
});

module.exports = router;
