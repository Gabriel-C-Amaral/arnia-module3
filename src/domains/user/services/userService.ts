import { CreateUserDTO } from "../dtos/createUserDTO";
import { createUser} from "../repository/userRepository"
import { LoginUserDTO } from "../dtos/loginUserDTO";
import { findUserByEmail, addToWalletRepository, findUserById, updateUserRepository } from "../repository/userRepository";
import { getProductById } from "../../products/repository/productRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user";


export const createUserService = async (User: CreateUserDTO) => {
    User.password = await bcrypt.hash(User.password, 10)


    const newUser = await createUser(User)
    if (!newUser) {
       throw new Error("Cannot create User");       
       
    }

    return newUser

}

export const loginUser = async (userData: LoginUserDTO) => {
    const user = await findUserByEmail(userData.email);
    console.log(user)
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

export const purchaseProductService = async (userId: string, productId: string) => {
    const user = await findUserById(userId);
    const product = await getProductById(productId);

    if (user.wallet >= product!.price) {
        user.wallet -= product!.price; // Deduct the product price from the user's wallet
        await updateUserRepository(user.id, { wallet: user.wallet });
        return { message: "Product purchased successfully" };
    } else {
        throw new Error("Insufficient wallet balance");
    }
};

export const getUserDetailsByIdService = async (userId: string) => {
    return await findUserById(userId); // Assumes this function returns user details including name and email
};
