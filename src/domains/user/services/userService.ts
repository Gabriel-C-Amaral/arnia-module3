import { CreateUserDTO } from "../dtos/createUserDTO";
import { createUser} from "../repository/userRepository"
import { LoginUserDTO } from "../dtos/loginUserDTO";
import { findUserByEmail, addToWalletRepository } from "../repository/userRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user";


export const createUserService = async (User: CreateUserDTO) => {

    const newUser = await createUser(User)
    if (!newUser) {
       throw new Error("Cannot create User");       
       
    }

    return newUser

}

export const loginUser = async (userData: LoginUserDTO) => {
    const user = await findUserByEmail(userData.email);
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const payload = { userId: user._id, isAdmin: user.isAdministrator };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return {
        message: "Login successful",
        token,
        userId: user._id,
        isAdmin: user.isAdministrator
    };
};

export const addToWalletService = async (userId: string, amount: number) => {
    return await addToWalletRepository(userId, amount);
};
