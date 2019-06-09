using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.HelpModels
{
    public class TicketPricesHelpModel
    {
        public int Hourly { get; set; }
        public int Daily { get; set; }
        public int Monthly { get; set; }
        public int Yearly { get; set; }
        public int IdPriceList { get; set; }
        public Pricelist PriceList { get; set; }
    }
}