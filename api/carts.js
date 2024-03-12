// Carts Service (carts.js)

const Cart = require('../dao/models/cart'); 

async function getAllCarts() {
    try {
        const carts = await Cart.find();
        return carts;
    } catch (error) {
        console.error('Error al obtener los carritos:', error);
        throw error;
    }
}


module.exports = {
    getAllCarts,
};
