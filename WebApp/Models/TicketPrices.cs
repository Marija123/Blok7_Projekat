using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class TicketPrices
    {
        public int Id { get; set; }
        public double Price { get; set; }

        
        [ForeignKey("Pricelist")]
        public int PricelistId { get; set; }
        public Pricelist Pricelist { get; set; }

        [ForeignKey("TicketType")]
        public int TicketTypeId { get; set; }
        public TicketType TicketType { get; set; }
    }
}