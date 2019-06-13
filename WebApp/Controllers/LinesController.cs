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


            List<SerialNumberSL> sl = unitOfWork.SerialNumberSLs.GetAll().ToList();
            List<Line> stats = unitOfWork.Lines.GetAll().ToList();
           foreach(Line l in stats)
            {
                //List<Station> ss = l.Stations;
                //l.Stations.Clear();
                l.Stations = new List<Station>();
                List<SerialNumberSL> ll = sl.FindAll(c => c.LineId == l.Id);
                List<SerialNumberSL> ll1 = ll.OrderBy(x => x.SerialNumber).ToList();
                foreach(SerialNumberSL t in ll1)
                {
                    List<Station> s = unitOfWork.Stations.GetAll().Where(m => m.Id == t.StationId).ToList();
                    l.Stations.Add(s[0]);
                }
            }
            return stats;
        }
        [HttpGet]
        //GET: api/Lines/5
        [Route("FindVehicle")]
      //  [ResponseType(typeof(int))]
        public Int32 FindVehicle(int id)
        {
            List<Timetable> list = unitOfWork.Timetables.GetAllTimetablesWithVehicles().ToList();
            foreach(Timetable t in list)
            {
                if(t.LineId == id)
                {
                    if(t.Vehicles != null && t.Vehicles.Count != 0)
                    {
                        return t.Vehicles.FirstOrDefault().Id;
                    }
                }
            }
            return -1;
        }

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

                //List<Line> stats = unitOfWork.Lines.GetAllLinesWithStations().ToList();


                unitOfWork.Lines.ReplaceStations(line.Id, line.Stations);
                List<SerialNumberSL> st = unitOfWork.SerialNumberSLs.GetAll().Where(sy => sy.LineId == line.Id).ToList();
                unitOfWork.SerialNumberSLs.RemoveRange(st);
                int i = 0;
                foreach (Station s in line.Stations)
                {
                    i++;
                    SerialNumberSL o = new SerialNumberSL();
                    o.LineId = line.Id;
                    o.StationId = s.Id;
                    o.SerialNumber = i;
                    unitOfWork.SerialNumberSLs.Add(o);
                   
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
            l.ColorLine = line.ColorLine;
            
            List<Station> stats = unitOfWork.Stations.GetAll().ToList();
            //line.Stations.Reverse();
            int i = 0;
            foreach(Station s in line.Stations)
            {
                i++;
                SerialNumberSL o = new SerialNumberSL();
                o.LineId = line.Id;
                o.StationId = s.Id;
                o.SerialNumber = i;
                unitOfWork.SerialNumberSLs.Add(o);
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