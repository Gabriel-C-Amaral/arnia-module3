// import productRepository from '../repository/productRepository'
const productRepository = require('../repository/productRepository')
import { CreateProductDTO } from "../dtos/createProductDTO"



export const createProductService = async (product: CreateProductDTO) => {

     const newProduct = await productRepository.createProduct(product)
     if (!newProduct) {
        throw new Error("Cannot create product");       
        
     }

     return newProduct
}

export const getAllProductsService = async () => {
   return await productRepository.getAllProducts();
}

// module.exports = {createProduct, getAllProducts}