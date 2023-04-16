const fs = require('fs');
const path = require('path');

const rootPath = require('../util/path');

const filePath = path.join(rootPath, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return cb([]);
        }
        return cb(JSON.parse(data));
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProdIndex = products.findIndex(p => p.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProdIndex] = this;
                fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(filePath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }

        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findProduct(id, cb) {
        getProductsFromFile(products => {
            const searchedProduct = products.find(p => p.id === id);
            cb(searchedProduct);
        });
    }
}