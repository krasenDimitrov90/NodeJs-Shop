const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {


    MongoClient.connect('mongodb+srv://krasendimitrov:n176S6m05sosLrZb@product-app-udemy.znr3hub.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected');
            _db = client.db();
            cb();
        })
        .catch(err => {
            console.log(err);
        })
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;