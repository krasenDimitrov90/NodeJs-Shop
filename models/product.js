const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const rootPath = require('../util/path');

const filePath = path.join(rootPath, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log('IN ERR');
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
        this.price = Number(price);
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

    static deleteById(id) {
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === id);
            const productPrice = product.price;
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
                if (!err) {
                    Cart.deleteProduct(id, productPrice);
                }
            });
        })
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