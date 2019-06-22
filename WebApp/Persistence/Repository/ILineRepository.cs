using System.Collections.Generic;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface ILineRepository : IRepository<Line,int>
    {
        IEnumerable<Line> GetAllLinesWithStations();
        string ReplaceStations(int lineId, IEnumerable<Station> stations);
        void Delete(int id);
    }
}

