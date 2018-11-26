const express = require('express');
const route = express.Router();

const readall = require('./readall.js');
const read = require('./read.js');
const deleteElement = require('./delete.js');
const createElement = require('./create.js');
const updateElement = require('./update.js');
const valid = require('./valid.js');

const notValidObject = {message: 'Query is not valid'};

const read_handler = (request,responce,next) => {
  if (valid.validRead(request.query)){
    request.result = read.read(request.query.id);
  }
  else{
    request.result = notValidObject;
  }
  next();
}

const create_handler = (request, responce, next) => {
  if (valid.validCreate(request.body)){
    request.result = createElement.create(request.body);
  }
  else{
    request.result = notValidObject;
  }
  next();
}

const update_handler = (request, responce, next) => {
  if (valid.validUpdate(request.body)){
    request.result = updateElement.update(request.body);
  }
  else{
    request.result = notValidObject;
  }
  next();
}

const delete_handler = (request,responce,next) => {
  if (valid.validDelete(request.body)){
    request.result = deleteElement.delete(request.body.id);
  }
  else{
    request.result = notValidObject;
  }
  next();
}

const send = (request,responce) => {
  responce.json(request.result);
}

route.get('/', (req, res) => {
    res.send('Hello World!');
});
  
route.get('/readall', (request,responce) => {
    responce.send(readall.readall())
});

route.get('/read', read_handler, send);

route.post('/create', create_handler, send);

route.post('/update', update_handler, send);

route.post('/delete', delete_handler, send);

module.exports = route;