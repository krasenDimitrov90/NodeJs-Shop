const fs = require('fs');
const path = require('path');

const rootPath = require('../util/path');


module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        const filePath = path.join(rootPath, 'data', 'products.json');
        fs.readFile(filePath, (err, data) => {
            let products = [];
            if (!err) {
                products = JSON.parse(data);
            }
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        const filePath = path.join(rootPath, 'data', 'products.json');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return cb([]);
            }
            return cb(JSON.parse(data));
        });
    }
}