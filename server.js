const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const account = require('./data/account.json');
const common = require('./data/common.json');
const fs = require('fs');
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiR2FyZGVuVXNlciIsIlN1YmplY3QiOiJnYXJkZW51c3IifQ._OsSKPlwdgV-Zxd8NTliaEgHOwN6UhJeOkwvoRzfLwQ";

server.use(middlewares);
server.use(jsonServer.bodyParser);


server.post('/login', (req, res, next) => {
  if (req.body.username === 'gardenusr' && req.body.password === 'GardenUser') {
    res.send({ token: TOKEN });
  } else {
    res.status(401).send({name: 'Error', message: 'Incorrect username or password'});
  }
});


server.listen(3000, () => {
  console.log('JSON Server is running');
});


function checkIfAuthorized(req, res, next) {
  if (req.headers.authorization !== `Bearer ${TOKEN}`) {
    res.sendStatus(401).send('Unauthorized');
  }
}

function updateAccount(res) {
  update(res, './data/account.json', account);
}

function update(res, path, object) {
  fs.writeFile(path, JSON.stringify(object), (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500).send('Error updating data');
    }
  });
}