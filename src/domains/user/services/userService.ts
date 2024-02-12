import { CreateUserDTO } from "../dtos/createUserDTO";
import { createUser} from "../repository/userRepository"



export const createUserService = async (User: CreateUserDTO) => {

    const newUser = await createUser(User)
    if (!newUser) {
       throw new Error("Cannot create User");       
       
    }

    return newUser

}