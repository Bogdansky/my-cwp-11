const getActorById = require('./read').getActorById;
const fs = require('fs');
const path = './actors.json';

module.exports = (req, res, next) => {
    let actors = JSON.parse(fs.readFileSync(path));
    let newActor = getActor(req.body, actors);
    actors.push(newActor);
    req.result = newActor;
    fs.writeFile(path, JSON.stringify(actors,'',3), (err) =>{
        if (err){
            console.log(err.message);
            throw err;
        }
        next();
    })
}

function getActor(json, actors){
    let id = getId(actors);
    return {
        id: id,
        name: json.name,
        birth: json.birth,
        films: json.films,
        liked: json.liked,
        photo: json.photo
    };
}

function getId(actors){
    let id = Math.round(Math.random() * 10);
    return getActorById(actors, id) ? getId(actors) : id;
}