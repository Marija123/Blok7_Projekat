using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Lines")]
    public class LinesController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork unitOfWork;

        public LinesController(IUnitOfWork uw)
        {
            unitOfWork = uw;
        }

        // GET: api/Lines
        [Route("GetLines")]
        public IEnumerable<Line> GetLines()
        {

            //unitOfWork.
            List<StationLines> sl = unitOfWork.StationLines.GetAll().ToList();
            List<Line> stats = unitOfWork.Lines.GetAllLinesWithStations().ToList();
           foreach(Line l in stats)
            {
                List<Station> ss = l.Stations;
                l.Stations.Clear();
                List<StationLines> ll = sl.FindAll(c => c.LineId == l.Id);
                List<StationLines> ll1 = ll.OrderBy(x => x.SerialNumber).ToList();
                foreach(StationLines t in ll1)
                {
                    l.Stations.Add(unitOfWork.Stations.Get(t.StationId));
                }
            }
            return stats;
        }

        // GET: api/Lines/5
        //[ResponseType(typeof(Line))]
        //public IHttpActionResult GetLine(int id)
        //{
        //    Line line = db.Lines.Find(id);
        //    if (line == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(line);
        //}

        [Route("Change")]
        // PUT: api/Lines/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLine(int id, Line line)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }



            if (id != line.Id)
            {
                return BadRequest();
            }



            try
            {

                List<Line> stats = unitOfWork.Lines.GetAllLinesWithStations().ToList();


                unitOfWork.Lines.ReplaceStations(line.Id, line.Stations);
                List<StationLines> st = unitOfWork.StationLines.GetAll().Where(sy => sy.LineId == line.Id).ToList();
                unitOfWork.StationLines.RemoveRange(st);
                int i = 0;
                foreach (Station s in line.Stations)
                {
                    i++;
                    StationLines o = new StationLines();
                    o.LineId = line.Id;
                    o.StationId = s.Id;
                    o.SerialNumber = i;
                    unitOfWork.StationLines.Add(o);
                   
                }

                unitOfWork.Complete();
                

                return Ok(line.Id);
            }
            catch (DbUpdateConcurrencyException)
            {
               
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("Add")]

        // POST: api/Lines
        [ResponseType(typeof(Line))]
        public IHttpActionResult PostLine(Line line)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            Line l = new Line();
            l.Stations = new List<Station>();
            l.LineNumber = line.LineNumber;
            List<Station> stats = unitOfWork.Stations.GetAll().ToList();
            //line.Stations.Reverse();
            int i = 0;
            foreach(Station s in line.Stations)
            {
                i++;
                StationLines o = new StationLines();
                o.LineId = line.Id;
                o.StationId = s.Id;
                o.SerialNumber = i;
                unitOfWork.StationLines.Add(o);
                //Station st = new Station();
                //st = stats.Find(x => x.Id.Equals(s.Id));
                l.Stations.Add(stats.Find(x => x.Id.Equals(s.Id)));
            }

            try
            {

                unitOfWork.Lines.Add(l);
                unitOfWork.Complete();
                
                return Ok(l.Id);
            }
            catch (Exception ex)
            {
                return NotFound();
            }

            //db.Lines.Add(line);
            //db.SaveChanges();

            //return CreatedAtRoute("DefaultApi", new { id = line.Id }, line);
        }

        //[Route("SerialNumber")]

        //// POST: api/Lines
        //[ResponseType(typeof(Line))]
        //public IHttpActionResult PostSerialNumber(Line line)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }


        //    List<StationLines> sl = unitOfWork.StationLines.GetAll().ToList();

        //    List<Station> stats = unitOfWork.Stations.GetAll().ToList();
        //    //line.Stations.Reverse();
        //    int i = 0;
        //    foreach (Station s in line.Stations)
        //    {
        //        i++;
        //       var k = sl.Find(x => x.LineId == line.Id && x.StationId == s.Id);
        //        k.SerialNumber = i;
        //        unitOfWork.StationLines.Update(k);

        //    }

        //    try
        //    {

               
        //        unitOfWork.Complete();

        //        return Ok(line.Id);
        //    }
        //    catch (Exception ex)
        //    {
        //        return NotFound();
        //    }

        //    //db.Lines.Add(line);
        //    //db.SaveChanges();

        //    //return CreatedAtRoute("DefaultApi", new { id = line.Id }, line);
        //}


        [Route("Delete")]
        // DELETE: api/Lines/5
        [ResponseType(typeof(Line))]
        public IHttpActionResult DeleteLine(int id)
        {
            Line line = unitOfWork.Lines.Get(id);
            if (line == null)
            {
                return NotFound();
            }

            //unitOfWork.Lines.Remove(line);
            unitOfWork.Lines.Delete(id);
            unitOfWork.Complete();

            return Ok(line);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        //private bool LineExists(int id)
        //{
        //    return db.Lines.Count(e => e.Id == id) > 0;
        //}
    }
}