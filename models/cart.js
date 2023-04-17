const fs = require('fs');
const path = require('path');
const rootPath = require('../util/path');

const filePath = path.join(rootPath, 'data', 'cart.json');


module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous Cart
        fs.readFile(filePath, (err, data) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(data);
            }
            // Analyze the cart => Find existing product
            let existingProductIndex = cart.products.findIndex(p => p.id === id);
            let existingProduct = cart.products[existingProductIndex];
            let updatedProduct = null;
            // Add new product / increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += Number(productPrice);

            fs.writeFile(filePath, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, price) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log({ err });
                return;
            }
            const updatedCart = { ...JSON.parse(data) };
            const product = updatedCart.products.find(p => p.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice -= (price * productQty);

            fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });
    }
}