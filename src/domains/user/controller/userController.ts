import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/createUserDTO";
import {addToWalletService, createUserService, getUserDetailsByIdService, purchaseProductService} from "../services/userService"
import { LoginUserDTO } from "../dtos/loginUserDTO";
import { loginUser } from "../services/userService";



export const newUser = async (req: Request, res: Response) => {
    try {
        // Validate the presence of the uploaded file
        if (!req.file || !req.file.filename) {
            throw new Error("File is required");
        }
 
        // Extract filename from the uploaded file
        const { filename } = req.file;
 
        // Create a new instance of CreateUserDTO with the request body and the image filename
        const createUserDto = new CreateUserDTO({
            ...req.body,
            image: filename, // Add the image filename to the User data
        });
 
        // Use the DTO to create a new User via the UserService
        const User = await createUserService(createUserDto);
 
        // Respond with the created User
        res.status(201).json(User);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
 };


 export const loginUserController = async (req: Request, res: Response) => {
    try {
        const userData: LoginUserDTO = new LoginUserDTO(req.body);
        const result = await loginUser(userData);
        res.status(200).json(result);
    } catch (error: any) {
        let statusCode = 500;
        if (error.message === "User not found" || error.message === "Invalid credentials") {
            statusCode = 400;
        }
        res.status(statusCode).json({ error: error.message });
    }
};

export const addToWallet = async (req: Request, res: Response) => {
    try {
        const { userId, amount } = req.body;
        const updatedUser = await addToWalletService(userId, amount);
        res.json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const purchaseProduct = async (req: Request, res: Response) => {
    try {
        const { userId, productId } = req.body;
        const purchaseResult = await purchaseProductService(userId, productId);
        res.json(purchaseResult);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserDetailsByIdController = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const userDetails = await getUserDetailsByIdService(userId!); 
    res.json({ name: userDetails.name, email: userDetails.email });
}