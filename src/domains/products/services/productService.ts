// import productRepository from '../repository/productRepository'
const productRepository = require('../repository/productRepository')
import { CreateProductDTO } from "../dtos/createProductDTO"



 const createProduct = async (product: CreateProductDTO) => {

     const newProduct = await productRepository.createProduct(product)
     if (!newProduct) {
        throw new Error("Cannot create product");       
        
     }

     return newProduct
}

const getAllProducts = async () => {
   return await productRepository.getAllProducts();
}

module.exports = {createProduct, getAllProducts}