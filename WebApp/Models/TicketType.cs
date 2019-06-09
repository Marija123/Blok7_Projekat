using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class TicketType
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<TicketPrices> TicketPrices { get; set; }

        public TicketType() { }

        public TicketType(string s)
        {
            Name = s;
        }

    }
}