// import  productService  from '../services/productService'
// const productService = require('../services/productService')
import { Request, Response } from "express";
import { CreateProductDTO } from "../dtos/createProductDTO";
import { createProductService, getAllProductsService, getProductByIdService, updateProductService} from "../services/productService"


const newProduct = async (req: Request, res: Response) => {
   try {
       // Validate the presence of the uploaded file
       if (!req.file || !req.file.filename) {
           throw new Error("File is required");
       }

       // Extract filename from the uploaded file
       const { filename } = req.file;

       // Create a new instance of CreateProductDTO with the request body and the image filename
       const createProductDto = new CreateProductDTO({
           ...req.body,
           image: filename, // Add the image filename to the product data
       });

       // Use the DTO to create a new product via the productService
       const product = await createProductService(createProductDto);

       // Respond with the created product
       res.status(201).json(product);
   } catch (error: any) {
       res.status(500).json({ message: error.message });
   }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await getAllProductsService();
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


const getProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const product = await getProductByIdService(productId);
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const updateData = req.body; // Assuming the request body contains the update data
        const updatedProduct = await updateProductService(productId, updateData);
        res.json(updatedProduct);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { newProduct, getAllProducts, getProductById, updateProduct };