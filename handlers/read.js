const fs = require('fs');

module.exports.read = (id) => {
    let json = JSON.parse(fs.readFileSync('./top250.json'));
    let searchedFilm = {};
    json.forEach(film => {
        if (film.id == id){
            searchedFilm = film;
        }
    });
    return searchedFilm;
};