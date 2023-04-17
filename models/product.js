const getDb = require('../util/database').getDb;

module.exports = class Product {
    constructor(title, price, description, imageUrl ) {
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
}