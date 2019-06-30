using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.HelpModels
{
    public class ShowTicketHelpModel
    {
        public int Id { get; set; }
        public DateTime? PurchaseTime { get; set; }
        public string ExparationTime { get; set; }
        public string TicketType { get; set; }
        public double TicketPrice { get; set; }
    }

    public class ValidateTicketHelpModel
    {
        public bool Valid { get; set; }
        public string Message { get; set; }

        public ValidateTicketHelpModel() { }
        public ValidateTicketHelpModel(bool t, string m)
        {
            Valid = t;
            Message = m;
        }
    }
}