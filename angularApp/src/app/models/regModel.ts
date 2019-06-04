export class RegModel{
    Email: string;
    Name: string;
    Surname: string;
    Address: string;
    Birthday: Date;
    Password: string;
    ConfirmPassword: string;
    Role: string;
    PassengerType: string;

    constructor(email: string, name: string, surname: string, address:string, birthday: Date,password: string, confirmPassword: string, role: string,passagerType: string){
        this.Email = email;
        this.Name = name;
        this.Address = address
        this.Surname = surname
        this.Birthday = birthday
        this.Password = password
        this.ConfirmPassword = confirmPassword
        this.Role = role;
        // if(passagerType != null && passagerType != ""){
        //     this.PassengerType = passagerType;
        // }
        this.PassengerType = passagerType;
    }
    
}