using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class TimetableRepository : Repository<Timetable, int>, ITimetableRepository
    {
        protected ApplicationDbContext Context { get { return context as ApplicationDbContext; } }
        public TimetableRepository(DbContext context) : base(context)
        {
        }
        public IEnumerable<Timetable> GetAllTimetablesWithVehicles()
        {
            List<Timetable> stats = Context.Timetables.Include(p => p.Vehicles).ToList();
            return stats;
        }
    }
}