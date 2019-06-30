export class ValidateTicketModel {
    Valid: boolean;
    Message: string;
    
  
    constructor(v: boolean,m: string) {
        this.Valid = v;
        this.Message= m;
    }
  }