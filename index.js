const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exist = require('fs').existsSync;

const actors = require('./handlers/actors/index');
const films = require('./handlers/index');
const api = require('./logger');

app.use('/api/actors', actors);
app.use('/api/films', films); 
app.use('/api', api);

app.use(bodyParser.json());
app.use('/actor', express.static(__dirname + '/images/actors'));

app.get('/actor/*', (req, res, next) => {
  if (!exist(req.path.split('/').pop)){
    res.sendFile(__dirname+'/images/actors/no.png')
  }
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
