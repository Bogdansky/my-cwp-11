const fs = require('fs');
const editArray = require('./edit_array.js');
const path = './top250.json';
const notFound = {film:"not found"};

module.exports.delete = (id) => {
    let json = JSON.parse(fs.readFileSync(path));
    return deleteElement(json,id);
};

function deleteElement(json, id){  
    let position = editArray.getIndex(json,id);
    let deletedFilm;
    if (position === -1){
        return notFound;
    }
    deletedFilm = json.splice(position-1, 1)[0];
    json = editArray.shakeArray(json,position);
    try{
        fs.writeFileSync(path, JSON.stringify(json, '', 3));
        return deletedFilm;
    }
    catch (error){
        return notFound;
    }
}

