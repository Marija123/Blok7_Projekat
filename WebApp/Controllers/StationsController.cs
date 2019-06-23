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
using System.Data.Linq;
using WebApp.Hubs;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Stations")]
    public class StationsController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork unitOfWork;
        private object locker = new object();
        private BusLocationHub hub;
        public StationsController(IUnitOfWork uw, BusLocationHub hubb)
        {
            unitOfWork = uw;
            hub = hubb;
        }






        [HttpPost]
        [Route("SendStationsToHub")]
        public IHttpActionResult SendStationsToHub(List<Station> list)
        {
            hub.AddStations(list);
            return Ok();
        }


        [Route("GetStations")]
        // GET: api/Stations
        public IEnumerable<Station> GetStations()
        {

            return unitOfWork.Stations.GetAll().ToList();

        }

        // GET: api/Stations/5
        [ResponseType(typeof(Station))]
        public IHttpActionResult GetStation(int id)
        {
            Station station = unitOfWork.Stations.Get(id);
            if (station == null)
            {
                return NotFound();
            }

            return Ok(station);
        }

        // PUT: api/Stations/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutStation(int id, Station station)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != station.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(station).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!StationExists(id))
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

        [Route("Add")]
        // POST: api/Stations
        [ResponseType(typeof(Station))]
        public IHttpActionResult PostStation(Station station)
        {


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (StationExists(station.Id))
            {
                return Content(HttpStatusCode.Conflict, "CONFLICT Station already exists!");
            }

            if (station.Version != 0)
            {
                station.Version = 0;
            }

            //validate station
            if (station.Name == null || station.Name == "")
            {
                return Content(HttpStatusCode.BadRequest, "You have to fill station name!");
            }
            if (station.Address == null || station.Address == "")
            {
                return Content(HttpStatusCode.BadRequest, "You have to click on map where you want station to be!");
            }

            List<Station> listOfStations = unitOfWork.Stations.GetAll().ToList();
            if (listOfStations.Exists(x => x.Name == station.Name))
            {
                return Content(HttpStatusCode.BadRequest, "Station with that name already exists!");
            }

            unitOfWork.Stations.Add(station);

            try
            {
                unitOfWork.Complete();
                return Ok(station.Id);

            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Content(HttpStatusCode.Conflict, ex);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }



        [Route("Change")]
        // POST: api/Stations
        [ResponseType(typeof(Station))]
        public IHttpActionResult ChangeStation(Station station)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(station.Id == 0)
            {
                return Content(HttpStatusCode.BadRequest, "You have to select or move station you want to change!");
            }

            Station stationDb = unitOfWork.Stations.Get(station.Id);

            if (stationDb != null)
            {
                //validate station
                if (station.Name == null || station.Name == "")
                {
                    return Content(HttpStatusCode.BadRequest, "You have to fill station name!");
                }
                if (station.Address == null || station.Address == "")
                {
                    return Content(HttpStatusCode.BadRequest, "You have to move station you want to change!");
                }

                List<Station> listOfStations = unitOfWork.Stations.GetAll().ToList();

                if (listOfStations.Exists(x => x.Name == station.Name && x.Id != station.Id))
                {
                    return Content(HttpStatusCode.BadRequest, "Station with that name already exists!");
                }

                if (stationDb.Version > station.Version)
                {
                    return Content(HttpStatusCode.Conflict, $" You are trying to edit a station  that has been changed recently. Try again.");
                }
            }
            else
            {
                return Content(HttpStatusCode.NotFound, "Station that you are trying to edit either do not exist or was previously deleted by another user.");
            }

           

            stationDb.Version++;
            stationDb.Latitude = station.Latitude;
            stationDb.Longitude = station.Longitude;
            stationDb.Name = station.Name;
            stationDb.Address = station.Address;
           

            try
            {
                unitOfWork.Stations.Update(stationDb);
                unitOfWork.Complete();
                return Ok(stationDb.Id);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Content(HttpStatusCode.Conflict, ex);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

           
        }



        // DELETE: api/Stations/5
        [Route("Delete")]
        [ResponseType(typeof(Station))]
        public IHttpActionResult DeleteStation(int id)
        {
            if(id == 0)
            {
                return Content(HttpStatusCode.BadRequest, "You have to click on station you want to remove!");
            }
           
          
           Station station = unitOfWork.Stations.Get(id);
           if (station == null)
           {
              return Content(HttpStatusCode.NotFound, "Station that you are trying to delete either do not exist or was previously deleted by another user.");
           }
           try
           {
              unitOfWork.Stations.Remove(station);
              unitOfWork.Complete();
              return Ok(station);
           }
           catch (DbUpdateConcurrencyException ex)
           {
                return Content(HttpStatusCode.Conflict, ex);
           }
           catch (Exception e)
           {
                return InternalServerError(e);
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

        private bool StationExists(int id)
        {
            return unitOfWork.Stations.Get(id) != null;
        }
    }
}