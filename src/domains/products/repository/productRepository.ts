import { ProductModel } from "../models/product"
import { CreateProductDTO } from "../dtos/createProductDTO"



export const createProduct = async (newProduct: CreateProductDTO) => {
    const product = await ProductModel.create(newProduct)
    return product
    
}

export const getAllProducts = async () => {
    return await ProductModel.find({});
}

export const getProductById = async (id: string) => {
    return await ProductModel.findById(id);
};