using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Pricelist
    {
        public int Id { get; set; }
        public DateTime? StartOfValidity { get; set; }
        public DateTime? EndOfValidity { get; set; }
        public List<TicketPrices> TicketPricess { get; set; }

        public int Version { get; set; }  //ne treba
    }
}