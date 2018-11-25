const fs = require('fs');

module.exports.readall = () => {
    let json = JSON.parse(fs.readFileSync('./top250.json'));
    console.log(json);
    return json.sort(compareByPosition);
};

function compareByPosition(firstObject, secondObject){
    return firstObject.position - secondObject.position;
}