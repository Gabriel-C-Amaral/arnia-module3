export class UpdateUserDTO {
    name?: string;
  email?: number;
  image?: string;
  isAdministrator?: Boolean;


  constructor(userData: UpdateUser) {
    this.name = userData?.name;
    this.email = userData?.email;
    this.image = userData?.image;
    this.isAdministrator = userData?.isAdministrator;
  }
}



type UpdateUser = {
    name?: string;
    email?: number;
    image?: string;
    isAdministrator?: Boolean;
}