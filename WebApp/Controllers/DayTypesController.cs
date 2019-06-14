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
    [RoutePrefix("api/DayTypes")]
    public class DayTypesController : ApiController
    {
       // private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork unitOfWork;
        public DayTypesController(IUnitOfWork uw)
        {
            unitOfWork = uw;
        }

        // GET: api/DayTypes
        [Route("GetDayTypes")]
        public IEnumerable<DayType> GetDayTypes()
        {
            return unitOfWork.DayTypes.GetAll().ToList();
        }

        // GET: api/DayTypes/5
        //[ResponseType(typeof(DayType))]
        //public IHttpActionResult GetDayType(int id)
        //{
        //    DayType dayType = db.DayTypes.Find(id);
        //    if (dayType == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(dayType);
        //}

        //// PUT: api/DayTypes/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutDayType(int id, DayType dayType)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != dayType.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(dayType).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!DayTypeExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //// POST: api/DayTypes
        //[ResponseType(typeof(DayType))]
        //public IHttpActionResult PostDayType(DayType dayType)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.DayTypes.Add(dayType);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = dayType.Id }, dayType);
        //}

        //// DELETE: api/DayTypes/5
        //[ResponseType(typeof(DayType))]
        //public IHttpActionResult DeleteDayType(int id)
        //{
        //    DayType dayType = db.DayTypes.Find(id);
        //    if (dayType == null)
        //    {
        //        return NotFound();
        //    }

        //    db.DayTypes.Remove(dayType);
        //    db.SaveChanges();

        //    return Ok(dayType);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        //private bool DayTypeExists(int id)
        //{
        //    return db.DayTypes.Count(e => e.Id == id) > 0;
        //}
    }
}