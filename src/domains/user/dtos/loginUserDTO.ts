export class LoginUserDTO {
    email: string;
    password: string;

    constructor(userData: UserData) {
        this.email = userData.email;
        this.password = userData.password;
    }
}

type UserData = {
    email: string,
    password: string
}