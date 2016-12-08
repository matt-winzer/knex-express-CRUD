exports.seed = function(knex, Promise) {
  return knex('cheese').del()
    .then(function () {
      const cheeses = [{
        name: 'swiss',
        age: 6,
        region: 'switzerland',
      }, {
        name: 'cheddar',
        age: 12,
        region: 'america',
      }, {
        name: 'blue',
        age: 24,
        region: 'america',
      }, {
        name: 'gouda',
        age: 6,
        region: 'holland',
      }];

      return knex('cheese').insert(cheeses);
    });
};
