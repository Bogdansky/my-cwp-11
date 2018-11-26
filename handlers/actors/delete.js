const fs = require('fs');
const path = './actors.json';
const notFound = {actor: "not found"};
const getIndex = require('../edit_array').getIndex;
const getActorById = require('./read').getActorById;

module.exports = (req, res, next) => {
    deleteActor(req);
    fs.writeFile(path, JSON.stringify(deleteActor(req), '', 3), (err) => {
        if (err){ 
            throw err;
        }
        next();
    })
}

function deleteActor(req){
    let actors = JSON.parse(fs.readFileSync(path)) || [];
    if (actors.length != 0){
        const id = req.body.id;
        req.result = getActorById(actors, id) ? actors.splice(getIndex(actors, id) - 1, 1) : notFound;
        return actors;
    }
    return actors;
}