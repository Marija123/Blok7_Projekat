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
    [RoutePrefix("api/Types")]
    public class PassengerTypesController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork unitOfWork;

        public PassengerTypesController(IUnitOfWork uw)
        {
            unitOfWork = uw;
        }

        // GET: api/PassengerTypes
        [Route("GetTypes")]
        public IEnumerable<PassengerType> GetPassengerTypes()
        {
            return unitOfWork.PassengerTypes.GetAll().ToList();
        }

        // GET: api/PassengerTypes/5
        [ResponseType(typeof(PassengerType))]
        public IHttpActionResult GetPassengerType(int id)
        {
            PassengerType passengerType = unitOfWork.PassengerTypes.Get(id);
            if (passengerType == null)
            {
                return NotFound();
            }

            return Ok(passengerType);
        }

        // PUT: api/PassengerTypes/5


        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutPassengerType(int id, PassengerType passengerType)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != passengerType.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(passengerType).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!PassengerTypeExists(id))
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

        // POST: api/PassengerTypes
        //[ResponseType(typeof(PassengerType))]
        //public IHttpActionResult PostPassengerType(PassengerType passengerType)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.PassengerTypes.Add(passengerType);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = passengerType.Id }, passengerType);
        //}

        // DELETE: api/PassengerTypes/5

        //[ResponseType(typeof(PassengerType))]
        //public IHttpActionResult DeletePassengerType(int id)
        //{
        //    PassengerType passengerType = db.PassengerTypes.Find(id);
        //    if (passengerType == null)
        //    {
        //        return NotFound();
        //    }

        //    db.PassengerTypes.Remove(passengerType);
        //    db.SaveChanges();

        //    return Ok(passengerType);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        //private bool PassengerTypeExists(int id)
        //{
        //    return db.PassengerTypes.Count(e => e.Id == id) > 0;
        //}
    }
}