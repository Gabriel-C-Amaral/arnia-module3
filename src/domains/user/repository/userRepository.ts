import { CreateUserDTO } from "../dtos/createUserDTO"
import { UserModel } from "../models/user"
import bcrypt from 'bcrypt'







export const createUser = async (newUser: CreateUserDTO) => {
    const User = await UserModel.create(newUser)
    User.password = await bcrypt.hash(User.password, 10)
    return User
    
}

export const findUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({ email });
    return user;
};

export const addToWalletRepository = async (userId: string, amount: number) => {
    return await UserModel.findByIdAndUpdate(userId, { $inc: { wallet: amount } }, { new: true });
};

export const updateUserRepository = async (userId: string, updateData: any) => {
    return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
};

export const findUserById = async (id: string) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        // Handle potential errors, such as invalid ID format
        throw new Error(error as any);
    }
};