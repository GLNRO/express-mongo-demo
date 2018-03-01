const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
import User from './models/users.js';

const port = 3001;

mongoose.connect('mongodb://127.0.0.1:27017/testdb');
let db = mongoose.connection;

db.once('open', () => {console.log('Connected to testDb')});
db.on('error', (err) => {console.log(err)});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  let results = {};
  User.find({}, (err, user) => {
    if(err){
      console.log(err)
    }
    else{
      results.users = user;
    }
    return res.json(results)
  })
})

app.post('/users', (req,res) => {

  let user = new User();
  user.username = req.body.username;

  user.save((err) => {
    if(err){
      console.log(err);
      return;
    }
    else{
      return res.json({status: 200, message: "User successfully added: ", user })
    }
  });

})


app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
