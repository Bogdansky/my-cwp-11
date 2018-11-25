const yearOfCinemaInvent = 1895;

module.exports.validRead = query => {
    if (typeof query.id === 'undefined' && (typeof query.id !== 'number' || typeof query.id !== 'string')){
        return false;
    }
    return true;
}

module.exports.validCreate = json => {
    if (json.length != 7 ){
        return false;
    }
    return validCreateJSON(json);
}

function validCreateJSON(json){
    let title = json.title != null ? json.title !== undefined : false;
    let rating = json.rating != null ? json.rating !== undefined : false;
    let position = json.position != null ? (json.position !== undefined && typeof json.position === 'number' && json.position < 1) : false;
    return title && rating && validNotImportantCreate(json) && position;
}

module.exports.validUpdate = json => {
    let id = typeof json.id != 'undefined' ? (json.id != null ? typeof json.id === 'number' || typeof json.id === 'string' : false) : false;
    return id && validNotImportantUpdate(json);
}

module.exports.validDelete = json =>{
    return json.id !== undefined ? (json.id != null ? typeof json.id === 'number' || typeof json.id === 'string' : false) : false;
}

function validNotImportantCreate(json){
    let year = json.year != null ? (json.year !== undefined && json.year < yearOfCinemaInvent && typeof json.year === 'number') : true;
    let budget = json.budget != null ? (json.budget !== undefined && typeof json.budget === 'number') : true;
    let gross = json.gross != null ? (json.gross !== undefined && typeof json.gross === 'number') : true;
    let poster = json.poster != null ? (json.poster !== undefined && typeof json.poster === 'string') : true;
    return year && budget && gross && poster;
}

function validNotImportantUpdate(json){
    let year = json.year != undefined ? (json.year !== null && json.year < yearOfCinemaInvent && typeof json.year === 'number') : true;
    let budget = json.budget != undefined ? (json.budget !== null && typeof json.budget === 'number') : true;
    let gross = json.gross != undefined ? (json.gross !== null && typeof json.gross === 'number') : true;
    let poster = json.poster != undefined ? (json.poster !== null && typeof json.poster === 'string') : true;
    return year && budget && gross && poster;
}