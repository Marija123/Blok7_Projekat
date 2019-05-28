using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class TicketPricesRepository : Repository<TicketPrices, int>, ITicketPricesRepository
    {
        public TicketPricesRepository(DbContext context) : base(context)
        {
        }
    }
}