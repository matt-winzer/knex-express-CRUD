const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const knex = require('./db/knex');

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`Listening on ${port}`);
});

app.get('/cheese', (req, res) => {
  knex('cheese')
    .then((cheeses) => {
      res.json(cheeses);
    });
});

app.get('/cheese/:id', (req, res) => {
  let id = req.params.id;
  knex('cheese').where('id', id)
    .first()
    .then((cheese) => {
      res.json(cheese);
    });
});

app.post('/cheese', (req, res) => {
  let cheese = req.body;
  knex('cheese').insert(cheese)
    .returning('id', 'name', 'age', 'region')
    .then((result) => {
      res.json({
        message: 'Successful Post!',
        record: result[0]
      });
    });
});

app.put('/cheese/:id', (req, res) => {
  let id = req.params.id;
  let edit = req.body;
  knex('cheese')
    .where('id', id)
    .update(edit)
    .returning('id', 'name', 'age', 'region')
    .then((result) => {
      res.json({
        message: 'Record Updated!',
        record: result[0]
      });
    });
});

app.delete('/cheese/:id', (req, res) => {
  let id = req.params.id;
  knex('cheese')
    .where('id', id)
    .del()
    .then((result) => {
      res.json({
        message: 'Row deleted!',
        record: id
      });
    });
});
