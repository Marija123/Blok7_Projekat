export class RegModel{
    Email: string;
    Name: string;
    Surname: string;
    Address: string;
    Birthday: Date;
    Password: string;
    ConfirmPassword: string;

    constructor(email: string, name: string, surname: string, address:string, birthday: Date,password: string, confirmPassword: string){
        this.Email = email;
        this.Name = name;
        this.Address = address
        this.Surname = surname
        this.Birthday = birthday
        this.Password = password
        this.ConfirmPassword = confirmPassword
    }

}