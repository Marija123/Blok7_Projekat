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
    [RoutePrefix("api/Timetables")]
    public class TimetablesController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork unitOfWork;

        private object locker = new object();
        public TimetablesController(IUnitOfWork uw)
        {
            unitOfWork = uw;
        }
        [Route("GetTimetables")]
        // GET: api/Timetables
        public IEnumerable<Timetable> GetTimetables()
        {
            return unitOfWork.Timetables.GetAll().ToList();
            //return db.Timetables;
        }
     

        // GET: api/Timetables/5
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult GetTimetable(int id)
        {
            Timetable timetable = unitOfWork.Timetables.Get(id);
            if (timetable == null)
            {
                return NotFound();
            }

            return Ok(timetable);
        }

        // PUT: api/Timetables/5
        [Route("Change")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTimetable(int id, Timetable timetable)
        {
            lock (locker)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != timetable.Id)
                {
                    return BadRequest();
                }


                unitOfWork.Timetables.Get(id).Departures = timetable.Departures;

                var ret = unitOfWork.Complete();
                //if (ret == -1)
                //{
                //    return BadRequest("The object has been modified already.");
                //}
              //  else
               // {
                    return Ok(timetable.Id);
               // }



                return StatusCode(HttpStatusCode.NoContent);
            }

        }

        // POST: api/Timetables
        [Route("Add")]
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult PostTimetable(Timetable timetable)
        {
            lock (locker)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Timetable t = new Timetable();
                t.Departures = timetable.Departures;

                t.DayTypeId = unitOfWork.DayTypes.Get(timetable.DayTypeId).Id;
                t.LineId = unitOfWork.Lines.Get(timetable.LineId).Id;
                t.Vehicles = new List<Vehicle>();
                t.Vehicles.Add(unitOfWork.Vehicles.Get(timetable.Vehicles.FirstOrDefault().Id));
                try
                {

                    unitOfWork.Timetables.Add(t);
                    unitOfWork.Complete();

                    return Ok(t.Id);
                }
                catch (Exception ex)
                {
                    return NotFound();
                }

            }

        }
        [Route("Delete")]
        // DELETE: api/Timetables/5
        [ResponseType(typeof(Timetable))]
        public IHttpActionResult DeleteTimetable(int id)
        {
            lock (locker)
            {
                Timetable timetable = unitOfWork.Timetables.Get(id);
                if (timetable == null)
                {
                    return NotFound();
                }

                unitOfWork.Timetables.Remove(timetable);
                unitOfWork.Complete();

                return Ok(timetable);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        //private bool TimetableExists(int id)
        //{
        //    return db.Timetables.Count(e => e.Id == id) > 0;
        //}
    }
}