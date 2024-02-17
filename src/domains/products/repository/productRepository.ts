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

export const updateProductByID = async (productId: string, updateData: any) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
        if (!updatedProduct) {
            throw new Error('Product not found');
        }
        return updatedProduct;
    } catch (error: any) {
        throw new Error(`Could not update the product: ${error.message}`);
    }
    
}