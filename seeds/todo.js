exports.seed = function(knex, Promise) {
  return knex('todo').del()
    .then(function () {
      const todos = [{
        title:'Build CRUD App',
        priority: 1,
        date: new Date()
      }, {
        title:'Do the dishes',
        priority: 3,
        date: new Date()
      }, {
        title:'Render a view',
        priority: 2,
        date: new Date()
      }, {
        title:'eating',
        priority: 5,
        date: new Date()
      }];

      return knex('todo').insert(todos);
    });
};
