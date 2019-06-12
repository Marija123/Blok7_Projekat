using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class VehicleRepository : Repository<Vehicle, int>, IVehicleRepository
    {
        protected ApplicationDbContext Context { get { return context as ApplicationDbContext; } }
        public VehicleRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Vehicle> GetAllAvailables()
        {
            List<Vehicle> stats = Context.Vehicles.Include(p => p.Timetables).ToList();
            return stats;
        }
    }
}