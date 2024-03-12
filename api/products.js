

const Product = require('../dao/models/product'); 


async function getAllProducts() {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
}


module.exports = {
    getAllProducts,
};
