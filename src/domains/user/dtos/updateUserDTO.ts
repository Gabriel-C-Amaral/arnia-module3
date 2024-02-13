export class UpdateUserDTO {
    name?: string;
  email?: string;
  image?: string;
  isAdministrator?: Boolean;
  wallet?: number


  constructor(userData: UpdateUser) {
    this.name = userData?.name;
    this.email = userData?.email;
    this.image = userData?.image;
    this.isAdministrator = userData?.isAdministrator;
    this.wallet = userData.wallet;
  }
}



type UpdateUser = {
    name?: string;
    email?: string;
    image?: string;
    isAdministrator?: Boolean;
    wallet?: number;
}