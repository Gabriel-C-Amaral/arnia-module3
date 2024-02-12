export class CreateUserDTO {
    name: string;
  email: number;
  image?: string;
  isAdministrator?: Boolean;


  constructor(userData: CreateUser) {
    this.name = userData.name;
    this.email = userData.email;
    this.image = userData?.image;
    this.isAdministrator = userData?.isAdministrator;
  }
}



type CreateUser = {
    name: string;
    email: number;
    image: string;
    isAdministrator?: Boolean;
}