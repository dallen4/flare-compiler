const fs = require('fs');
const path = require('path');

function read(fileName) {

    let filePath = path.join(__dirname, '..', fileName);

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, data) => {
            error ? reject(error) : resolve(data);
        });
    });

}

function write(fileName, data) {

    let filePath = path.join(__dirname, '..', fileName);

    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, error => {
            error ? reject(error) : resolve(fileName + ' has been generated...');
        });
    });

}

module.exports = { read, write };
