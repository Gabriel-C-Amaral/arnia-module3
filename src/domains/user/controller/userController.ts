import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/createUserDTO";
import {createUserService} from "../services/userService"


const newUser = async (req: Request, res: Response) => {
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



 module.exports = { newUser}