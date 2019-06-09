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
using WebApp.Models.HelpModels;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Pricelists")]
    public class PricelistsController : ApiController
    {
       // private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IUnitOfWork unitOfWork;

        public PricelistsController(IUnitOfWork uw)
        {
            unitOfWork = uw;
        }
        [Route("GetPricelists")]
        // GET: api/Pricelists
        public IEnumerable<Pricelist> GetPricelists()
        {
            return unitOfWork.PriceLists.GetAllPricelists().ToList();
        }

        // GET: api/Pricelists/5
        [Route("GetPricelist")]
        [ResponseType(typeof(Pricelist))]
        public Pricelist GetPricelist()
        {
            Pricelist pricelist = unitOfWork.PriceLists.GetAllPricelists().ToList().FindLast(x=> x.EndOfValidity >= DateTime.Now && x.StartOfValidity<= DateTime.Now);
           
            return pricelist;
        }
        [Route("GetPricelistLast")]
        [ResponseType(typeof(Pricelist))]
        public Pricelist GetPricelistLast()
        {
            Pricelist pricelist = unitOfWork.PriceLists.GetAllPricelists().ToList().Last();
            return pricelist;
        }

        //// PUT: api/Pricelists/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutPricelist(int id, Pricelist pricelist)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != pricelist.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(pricelist).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!PricelistExists(id))
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

        // POST: api/Pricelists
        [Route("Add")]
        [ResponseType(typeof(Pricelist))]
        public bool PostPricelist(TicketPricesHelpModel t)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }


            try
            {
                Pricelist prl = new Pricelist();
                prl = t.PriceList;
                prl.TicketPricess = new List<TicketPrices>();
                TicketPrices tp = new TicketPrices();
                tp.TicketTypeId = unitOfWork.TicketTypes.Find(k => k.Name == "Hourly").FirstOrDefault().Id;
     
                tp.Price = t.Hourly;

                prl.TicketPricess.Add(tp);
                tp = new TicketPrices();
                tp.TicketTypeId = unitOfWork.TicketTypes.Find(k => k.Name == "Daily").FirstOrDefault().Id;
                //tp.PricelistId = unitOfWork.PriceLists.Get(hm.IdPriceList).Id;
                tp.Price = t.Daily;
                prl.TicketPricess.Add(tp);
                tp = new TicketPrices();
                tp.TicketTypeId = unitOfWork.TicketTypes.Find(k => k.Name == "Monthly").FirstOrDefault().Id;
                //tp.PricelistId = unitOfWork.PriceLists.Get(hm.IdPriceList).Id;
                tp.Price = t.Monthly;
                prl.TicketPricess.Add(tp);
                tp = new TicketPrices();
                tp.TicketTypeId = unitOfWork.TicketTypes.Find(k => k.Name == "Yearly").FirstOrDefault().Id;
                //tp.PricelistId = unitOfWork.PriceLists.Get(hm.IdPriceList).Id;
                tp.Price = t.Yearly;
                prl.TicketPricess.Add(tp);

                unitOfWork.PriceLists.Add(prl);
                unitOfWork.Complete();

                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        //// DELETE: api/Pricelists/5
        //[ResponseType(typeof(Pricelist))]
        //public IHttpActionResult DeletePricelist(int id)
        //{
        //    Pricelist pricelist = db.Pricelists.Find(id);
        //    if (pricelist == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Pricelists.Remove(pricelist);
        //    db.SaveChanges();

        //    return Ok(pricelist);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        //private bool PricelistExists(int id)
        //{
        //    return db.Pricelists.Count(e => e.Id == id) > 0;
        //}
    }
}