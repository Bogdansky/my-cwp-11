const fs = require('fs');
const path = './actors.json';

module.exports.readall = (req,res,next) => {
    fs.readFile(path, (err, data) => {
        if (err){
            callError(err);
        }
        req.result = JSON.parse(data).sort(compareActors);
        next();
    })
}

module.exports.read = (req, res, next) => {
    fs.readFile(path, (err, data) => {
        callError(err);
        req.result = getActor(JSON.parse(data), req.query.id) || {actor: "not found"};
        next();
    })
}

function compareActors(first, second){
    return first.liked - second.liked;
}

module.exports.getActorById = function getActor(actors, id){
    let soughtFor;
    actors.forEach(actor => {
        if (actor.id == id){
            soughtFor = actor;
        }   
    });
    return soughtFor;
}

function callError(err){
    if (err){
        console.log(err.message);
        throw err;
    }
}

