import { CreateUserDTO } from "../dtos/createUserDTO"
import { UserModel } from "../models/user"






export const createUser = async (newUser: CreateUserDTO) => {
    const User = await UserModel.create(newUser)
    return User
    
}

export const findUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({ email });
    return user;
};