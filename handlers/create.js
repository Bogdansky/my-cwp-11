const fs = require('fs');
const editArray = require('./edit_array');
const path = './top250.json';

module.exports.create = json => {
    json.id = Math.round(Math.random()*100)+10;
    let createdElement = createElement(json);
    let top = getTop();
    if (createdElement.position > top.length+1){
        createdElement.position = top.length+1;
    }
    top.splice(json.position-1, 0, createdElement);
    if (top.length > json.position){
        top = editArray.shakeArray(top, json.position, 0);
    }
    let result = writeArray(top, createdElement);
    if (result != 'success'){
        return result;
    }
    return createdElement;
}

function createElement(json){
    return {
        id: json.id,
        title: json.title,
        rating: json.rating,
        year: json.year,
        budget: json.budget,
        gross: json.gross,
        poster: json.poster,
        position: json.position
    };
}

function getTop(){
    try{
        return JSON.parse(fs.readFileSync(path));
    }
    catch (error){
        return getErrorObject(error);
    }
}

function writeArray(json, element){
    try {
        fs.writeFileSync(path, JSON.stringify(json, '', 3));
        return 'success';
    }
    catch (error){
        return getErrorObject(error);
    }
}

function getErrorObject(error){
    return {error: error.message};
}
