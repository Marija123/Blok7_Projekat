using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class DayTypeRepository : Repository<DayType, int>, IDayTypeRepository
    {
        public DayTypeRepository(DbContext context) : base(context)
        {
        }
    }
}