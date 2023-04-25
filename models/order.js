const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderSchema = new Schema({
    products: [{
        product: { type: Object, required: true },
        quantity: { type: Number, required: true }
    }],
    user: {
        userId: {
            type: Schema.Types.ObjectId,
            reuired: true,
            ref: 'User'
        },
        email: {
            type: String,
            reuired: true
        }
    }
});

module.exports = mongoose.model('Order', orderSchema);