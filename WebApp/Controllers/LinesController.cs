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
        private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork unitOfWork;

        public LinesController(IUnitOfWork uw)
        {
            unitOfWork = uw;
        }

        // GET: api/Lines
        [Route("GetLines")]
        public IEnumerable<Line> GetLines()
        {
           

            List<Line> stats = db.Lines.Include(p => p.Stations).ToList();
           
            return stats;
        }

        // GET: api/Lines/5
        [ResponseType(typeof(Line))]
        public IHttpActionResult GetLine(int id)
        {
            Line line = db.Lines.Find(id);
            if (line == null)
            {
                return NotFound();
            }

            return Ok(line);
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

            //db.Entry(line).State = EntityState.Modified;

            try
            {

                var vs = unitOfWork.Lines.GetAll();
                Line v = vs.ToList<Line>().Where(ve => ve.Id == id).ToList().First();
                v.Stations = new List<Station>();
                
                v.Id = id;
                v.LineNumber = line.LineNumber;
                
                List<Station> stations = unitOfWork.Stations.GetAll().ToList();
                foreach(Station s in stations)
                {
                    foreach(Station k in line.Stations)
                    {
                        if(s.Id == k.Id)
                        {
                            s.Lines = new List<Line>();
                           
                            v.Stations.Add(s);
                        }
                    }
                }
               

                unitOfWork.Lines.Update(v);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
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
            foreach(Station s in line.Stations)
            {
                Station st = new Station();
                st = stats.Find(x => x.Id.Equals(s.Id));
                
                l.Stations.Add(st);
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
        [Route("Delete")]
        // DELETE: api/Lines/5
        [ResponseType(typeof(Line))]
        public IHttpActionResult DeleteLine(int id)
        {
            Line line = db.Lines.Find(id);
            if (line == null)
            {
                return NotFound();
            }

            db.Lines.Remove(line);
            db.SaveChanges();

            return Ok(line);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LineExists(int id)
        {
            return db.Lines.Count(e => e.Id == id) > 0;
        }
    }
}