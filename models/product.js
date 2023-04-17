const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

module.exports = class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = Number(price);
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOperation;
        if (this._id) {
            console.log(this._id);
            console.log(new mongodb.ObjectId(this._id));
            dbOperation = db.collection('products')
                .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this});
        } else {
            dbOperation = db.collection('products').insertOne(this);
        }
        return dbOperation
            .then(result => {
                // console.log(result);
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
                // console.log(products);
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
                // console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
}