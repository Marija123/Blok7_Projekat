using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class PassengerTypeRepository : Repository<PassengerType, int>, IPassengerTypeRepository
    {
        protected ApplicationDbContext Context { get { return ApplicationDbContext.Create(); } }
        public PassengerTypeRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<PassengerType> GetAll(int index, int size)
        {
            return Context.PassengerTypes.Skip((index - 1) * size).Take(size);
        }
    }
}