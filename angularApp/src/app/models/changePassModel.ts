export class ChangePasswordModel{
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;
    
    constructor( o:string, n: string, c: string ){
        this.OldPassword = o;
        this.NewPassword = n;
        this.ConfirmPassword = c;
      
    }
}