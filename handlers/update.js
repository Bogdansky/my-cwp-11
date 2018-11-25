const fs = require('fs');
const path = './top250.json';
const editArray = require('./edit_array');

module.exports.update = (json) => {
    let top = getTop();
    let index = editArray.getIndex(top,json) - 1;
    updateElement(json, top);
    return rewriteTop(top) === 'success' ? top[index] : {element:'not found'};
}

function getTop(){
    try{
        return JSON.parse(fs.readFileSync(path));
    }
    catch (error){
        return getErrorObject(error);
    }
}

function updateElement(json, top){
    let position = editArray.getIndex(top, json.id);
    if (typeof json.position != undefined && position != json.position){
        shakeByPosition(top, position, json.position);
    }
    for(let key in json){
        top[position-1][key] = json[key];
    }
}

function shakeByPosition(top, oldPosition, newPosition){
    if (oldPosition != newPosition){
        switch (oldPosition > newPosition){
            case true: 
            shiftDown(top,oldPosition,newPosition);
            break;
            case false:
            shiftUp(top, oldPosition, newPosition);
            break;
        }
    }
}

function shiftDown(top, oldPosition, newPosition){
    top.forEach(element => {
        if (element.position >= newPosition && element.position < oldPosition) {
            element.position++;
        }
    });
}

function shiftUp(top, oldPosition, newPosition){
    top.forEach(element => {
        if (element.position > oldPosition && element.position <= newPosition) {
            element.position--;
        }
    });
}

function rewriteTop(json){
    try {
        fs.writeFileSync(path, JSON.stringify(json, '', 3));
        return 'success';
    }
    catch (error){
        return getErrorObject(error);
    }
}

