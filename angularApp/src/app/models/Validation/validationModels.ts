export class RegistrationValidations {
    emailOk: boolean = true;
    NameOk: boolean = true;
    SurnameOk: boolean = true;
    dateOk: boolean = true;
    AddressOk: boolean = true;
    RoleOk: boolean = true;
    PassangerTypeOK: boolean = true;
    passwordOk: boolean = true;
    password2Ok: boolean = true;

    validate(registrationData) {
      let wrong = false;
      if (registrationData.Email == null || registrationData.Email == "") {
        this.emailOk = false;
        wrong = true;
      }
      else this.emailOk = true;
  
      if (registrationData.Name == null || registrationData.Name == "") {
        this.NameOk = false;
        wrong = true;
      }
      else this.NameOk = true;
      if (registrationData.Surname == null || registrationData.Surname == "") {
        this.SurnameOk = false;
        wrong = true;
      }
      else this.SurnameOk = true;
      if (registrationData.Address == null || registrationData.Address == "") {
        this.AddressOk = false;
        wrong = true;
      }
      else this.AddressOk = true;

      if (registrationData.Birthday == null || registrationData.Birthday == "") {
        this.dateOk = false;
        wrong = true;
      }
      else this.dateOk = true;
    //   if (registrationData.Role == null || registrationData.Role == "") {
    //     this.RoleOk = false;
    //     wrong = true;
    //   }
    //   else this.RoleOk = true;
      
    //   if (registrationData.PassangerType == null || registrationData.PassangerType == "") {
    //     this.PassangerTypeOK = false;
    //     wrong = true;
    //   }
    //   else this.PassangerTypeOK = true;

      if (registrationData.Password == null || registrationData.Password == "") {
        this.passwordOk = false;
        wrong = true;
      }
      else this.passwordOk = true;
  
      if (registrationData.ConfirmPassword == null || registrationData.ConfirmPassword == "") {
        this.password2Ok = false;
        wrong = true;
      }
      else this.password2Ok = true;
  
      return wrong;
    }
}

export class SignInValidations{
    emailOk: boolean = true;
    passwordOk: boolean = true;

    validate(loginData) {
      let wrong = false;
      if (loginData.Email == null || loginData.Email == "") {
        this.emailOk = false;
        wrong = true;
      }
      else this.emailOk = true;
  
      if (loginData.Password == null || loginData.Password == "") {
        this.passwordOk = false;
        wrong = true;
      }
      else this.passwordOk = true;

      return wrong;
    }
}
