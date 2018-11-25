const fs = require('fs');
const path = './log.json';

module.exports = (req,res,next) => {
    let info = {
        date: new Date(),
        path: req.path,
        params: req.query || req.body
    };
    let logInfo = JSON.parse(fs.readFileSync(path)) || [];
    logInfo.push(info);
    fs.writeFile(path, JSON.stringify(logInfo, '', 3), (err) => {
        if (err) {
            console.log(err.message);
            throw err;
        }
        next();
    })
}