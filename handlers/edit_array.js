module.exports.shakeArray = (json, place, shift = -1) => {
    let start = place + shift, finish = json.length + 1 + shift;
    console.log(`start - ${start}\nfinish - ${finish}`);
    for (let index = start; index < finish + shift + 1; index++){
        json[index].position = index + 1;
    }
    return json;
}

module.exports.getIndex = function getIndex(array, id){
    let index;
    array.forEach((element,position) => {
        if (element.id === id){
            index = position + 1;
        }
    })
    return index ? index : -1;
}