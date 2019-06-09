using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class PricelistRepository : Repository<Pricelist, int>, IPricelistRepository
    {
        protected ApplicationDbContext Context { get { return context as ApplicationDbContext; } }
        public PricelistRepository(DbContext context) : base(context)
        {
           
        }

        public IEnumerable<Pricelist> GetAllPricelists()
        {
            return Context.Pricelists.Include(p => p.TicketPricess).ToList();
        }
    }
}