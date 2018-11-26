const express = require('express');
const route = express.Router();

const readAllActors_handler = require('./read').readall;
const readActor_handler = require('./read').read;
const createActor_handler = require('./create');
const updateActor_handler = require('./update');
const deleteActor_handler = require('./delete');
const validForActor = require('./valid');

const send = (request,responce) => {
    responce.json(request.result);
}

route.get('/readall', readAllActors_handler, send);// - возвращает массив актеров отсортированных по полю liked по убыванию 
route.get('/read', validForActor, readActor_handler, send);//  - возвращает актера по переданному в теле запроса id
route.post('/create', validForActor, createActor_handler, send)// создает актера с переданными в теле запроса параметрами / id генерируется на сервере / сервер возвращает созданного актера 
route.post('/update', validForActor, updateActor_handler, send);// обновляет актера с переданными параметрами по переданному id / возвращаем обновленного актера / клиент может присылать для обновления только часть полей 
route.post('/delete', validForActor, deleteActor_handler, send);// удаляет актера по переданному id

module.exports = route;