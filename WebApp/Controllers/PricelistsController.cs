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
            Pricelist pricelist = unitOfWork.PriceLists.GetAllPricelists().ToList().FindLast(x=> x.EndOfValidity.Value.Date >= DateTime.Now.Date && x.StartOfValidity.Value.Date<= DateTime.Now.Date);
           
            return pricelist;
        }
        [Route("GetPricelistLast")]
        [ResponseType(typeof(Pricelist))]
        public Pricelist GetPricelistLast()
        {
            Pricelist pricelist = unitOfWork.PriceLists.GetAllPricelists().ToList().Last();
            return pricelist;
        }

 
        // POST: api/Pricelists
        [Route("Add")]
        [ResponseType(typeof(Pricelist))]
        public IHttpActionResult PostPricelist(TicketPricesHelpModel t)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //validacije
            if(t.Hourly<= 0 || t.Daily<=0 || t.Monthly<=0 || t.Yearly<=0)
            {
                return Content(HttpStatusCode.BadRequest, "Prices can't be less then 1!");
            }
            if(t.PriceList.StartOfValidity.ToString() == "" || t.PriceList.EndOfValidity.ToString() == "" || t.PriceList.StartOfValidity == null || t.PriceList.EndOfValidity == null)
            {
                return Content(HttpStatusCode.BadRequest, "Start or end of validity can't be empty!");
            }
            if(t.PriceList.StartOfValidity.Value.Date < DateTime.Now.Date)
            {
                return Content(HttpStatusCode.BadRequest, "You can't make pricelist for past!");
            }

            if(t.PriceList.StartOfValidity > t.PriceList.EndOfValidity)
            {
                return Content(HttpStatusCode.BadRequest, "Start of validity is bigger then end of validity!");
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

                return Ok();
            }
            catch (Exception ex)
            {

                return NotFound();
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