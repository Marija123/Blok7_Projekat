using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class LineRepository : Repository<Line, int>, ILineRepository
    {
        protected ApplicationDbContext Context { get { return context as ApplicationDbContext; } }
        public LineRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Line> GetAllLinesWithStations()
        {
            List<Line> stats = Context.Lines.Include(p => p.Stations).ToList();
            return stats;
        }

        public void ReplaceStations(int lineId, IEnumerable<Station> stations)
        {
            //var line = Context.Lines.Find(lineId);
            //line.Stations = new List<Station>();
            var line = Context.Lines.Include(l => l.Stations).Where(l => l.Id == lineId).FirstOrDefault();
            line.Stations.Clear();
            
           
            foreach(Station s in stations)
            {
                line.Stations.Add(Context.Stations.Find(s.Id));
            }
           // stations.Reverse();

           // line.Stations.AddRange(stations);
            
            
        }

        public void Delete(int id)
        {
            var l = Context.Lines.Where(q => q.Id == id).Include(p => p.Stations);
            Context.Lines.RemoveRange(l);
        
        }

    }
}