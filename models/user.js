const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

module.exports = class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });

        let newQuantity = 1;
        let updatedCartItems = [...this.cart.items];
        if (cartProductIndex >= 0) {
            newQuantity += updatedCartItems[cartProductIndex].quantity;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            });
        }

        const db = getDb();
        const updatedCart = { items: updatedCartItems };
        return db.collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            )
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
            .findOne({ _id: new ObjectId(userId) });
    }
}