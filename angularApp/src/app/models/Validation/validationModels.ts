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
export class AddStationValidation {
 
    nameOk: boolean = true;
    
    addressOk:boolean = true;
    longitudeOk: boolean = true;
    latitudeOk: boolean = true;

    validate(statData) {
      let wrong = false;
      if (statData.Name == null || statData.Name == "") {
        this.nameOk = false;
        wrong = true;
      }
      else this.nameOk = true;
  
      if (statData.Address == null || statData.Address == "") {
        this.addressOk = false;
        wrong = true;
      }
      else this.addressOk = true;

      if (statData.Longitude == null || statData.Longitude == "") {
        this.longitudeOk = false;
        wrong = true;
      }
      else this.longitudeOk = true;

      if (statData.Latitude == null || statData.Latitude == "") {
        this.latitudeOk = false;
        wrong = true;
      }
      else this.latitudeOk = true;

      return wrong;
    }
  }

    export class AddLinesValidation{
      
      lineNumberOk:boolean = true;
      stationsOk: boolean = true;
  
      validate(lineData) {
        let wrong = false;
        if (lineData.LineNumber == null || lineData.LineNumber == "") {
          this.lineNumberOk = false;
          wrong = true;
        }
        else this.lineNumberOk = true;
    
        if (lineData.Stations.length == 0 || lineData.Stations == null || lineData.Stations == [] || lineData.Stations == undefined) {
          this.stationsOk = false;
          wrong = true;
        }
        else this.stationsOk = true;
        return wrong;
      }
    }

    

