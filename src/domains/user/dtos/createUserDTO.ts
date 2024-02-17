export class CreateUserDTO {
    name: string;
  email: number;
  image?: string;
  isAdministrator?: Boolean;
  password: string;


  constructor(userData: CreateUser) {
    this.name = userData.name;
    this.email = userData.email;
    this.image = userData?.image;
    this.isAdministrator = userData?.isAdministrator;
    this.password = userData.password
  }
}



type CreateUser = {
    name: string;
    email: number;
    image: string;
    isAdministrator?: Boolean;
    password: string;
}