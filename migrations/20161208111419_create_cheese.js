
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cheese', function(table){
    table.increments();
    table.text('name');
    table.integer('age');
    table.text('region');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cheese');
};
