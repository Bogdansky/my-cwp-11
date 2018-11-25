const fs = require('fs');
const path = './actors.json';
const notFound = {actor: "not found"};
const getIndex = require('../edit_array').getIndex;

module.exports = (req,res,next) => {
    const actors = JSON.parse(fs.readFileSync(path));
    if (actors){
        req.result = updateActor(actors, req.body);
    }
    else{
        req.result = notFound;
    }
    next();
}

function updateActor(actors, info){
    let index = getIndex(actors, info.id)-1;
    return index < 0 ? notFound : updateElement(actors, info, index)
}

function updateElement(actors, newData, index){
    for(key in newData){
        actors[index][key] = newData[key];
    }
    return actors[index];
}