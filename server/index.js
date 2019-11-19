// jshint esversion:6
const express= require('express');
const path  = require('path');
const db = require('../db');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/groceries', (req, res) => {
  db.query((`select * from list`), (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.get('/groceries/:name', (req, res) => {
  db.query((`select * from list where name = "${req.params.name}"`), (err, results) => {
    if (err) {
      res.status(404).send('Item couldn\'t be retrieved.');
    } else {
      res.status(200).send('Item was successfully retrieved');
    }
  });
});

app.post('/groceries', (req, res) => {
  if (req.body.name && req.body.quantity) {
    db.query((`insert into list (name, quantity) values ("${req.body.name}", ${req.body.quantity})`), (err, results) => {
      if (err) {
        res.status(400).send('Item was not successfully added to grocery list.');
      } else {
        res.status(201).send('Item was successfully added to grocery list.');
      }
    });
  } else {
    res.status(400).send('Form inputs invalid.');
  }

});

app.put('/groceries/:name', (req, res) => {
  db.query((`update list set quantity = ${req.body.quantity} where name = "${req.params.name}"`), (err, results) => {
    if (err) {
      res.status(404).send('Item was not successfully updated.');
    } else {
      res.status(204).send('Item was successfully updated');
    }
  });
});

app.delete('/groceries', (req, res) => {
  console.log(req.query);
  db.query((`delete from list where name = "${req.query.name}"`), (err, results) => {
    if (err) {
      res.status(404).send('Item was not successfully deleted.');
    } else {
      res.status(204).send('Item was successfully deleted.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});