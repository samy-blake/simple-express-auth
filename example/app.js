const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')


const simpleAuth = require('../index');
simpleAuth.config.userFilePath = path.join(__dirname, 'data', 'user.json');


app.use(bodyParser.json());

app.get('/', function (req, res) {
  let display = simpleAuth.user.get();
  res.send(JSON.stringify(display));
});

app.get('/add', function (req, res) {
  simpleAuth.user.set({
    username: 'test' + new Date().getTime(),
    password: 'testpw' + new Date().getTime()
  });

  res.redirect('/');
});

app.get(
  '/auth-test', 
  simpleAuth.auth(['admin', 'user'], '/'),
  function (req, res) {
    res.send('läuft!' + JSON.stringify(res.user));
  }
);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
