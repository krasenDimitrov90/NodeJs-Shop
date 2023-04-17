const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

module.exports = class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = Number(price);
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        return db.collection('products').insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
}