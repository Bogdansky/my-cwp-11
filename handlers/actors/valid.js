const badRequest = 'Bad request';

module.exports = (req, res, next) => {
    const method = req.path.split('/').pop();
    let valid = false;
    switch(method){
        case 'read':
        valid = haveId(req.query);
        break;
        case 'create':
        valid = checkCreate(req.body);
        break;
        case 'update':
        valid = checkUpdate(req.body);
        break;
        case 'delete':
        valid = haveId(req.body);
        break;
        default:
        res.send(badRequest);
        break;
    }
    doWork(valid, res, next);
}

function haveId(object){
    return object.id;
}

function checkCreate(object){
    return object && object.length == 5 && !object.id 
                && object.name && object.birth && object.films
                && object.liked && object.photo;
}

function checkUpdate(object){
    return object.id && (object.name || object.birth || object.films
        || object.liked || object.photo);
}

function doWork(valid, res, next){
    if (valid){
        next();
    }
    else{
        res.send(badRequest);
    }
}