const fs = require('fs');

function read(fileName) {

    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (error, data) => {
            error ? reject(error) : resolve(data);
        });
    });

}

function write(fileName, data) {

    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, error => {
            error ? reject(error) : resolve(fileName + ' has been generated...');
        });
    });

}

module.exports = { read, write };
