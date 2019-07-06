using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
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
    [RoutePrefix("api/Tickets")]
    public class TicketsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        private readonly IUnitOfWork unitOfWork;
        private ApplicationUserManager _userManager;
        public TicketsController(ApplicationUserManager userManager,IUnitOfWork uw)
        {
            UserManager = userManager;
            unitOfWork = uw;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [Route("GetTicketTypes")]
        //GET: api/Tickets
        public IEnumerable<TicketType> GetTicketTypes()
        {
            return unitOfWork.TicketTypes.GetAll().ToList();
        }

      

        [Route("GetTicket")]
        // GET: api/Tickets/5
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult GetTicket(int id)
        {

            Ticket ticket = unitOfWork.Tickets.GetTicketWithInclude(id);
            
            if (ticket == null)
            {
                return Content(HttpStatusCode.NotFound, "Ticket is not in database") ;
            }
            if(ticket.ApplicationUser != null)
            {
                ticket.ApplicationUserId = ticket.ApplicationUser.Email;
            }
            

            return Ok(ticket);
        }

        [Route("validateTicketNoUser")]
        public IHttpActionResult ValidateTicketNoUser(Ticket ticket)
        {
            if(ticket == null)
            {
                return Content(HttpStatusCode.BadRequest, "Ticket doesnt exists");
            }
            DateTime pr =(DateTime) ticket.PurchaseTime;
            DateTime aa = pr.AddHours(1);
            if (aa < DateTime.Now)
            {
                return Content(HttpStatusCode.BadRequest, "Ticket is not valid. Time is up!");
            }
            return Ok("Ticket is valid!");
        }

        [Route("validateTicket")]
        public ValidateTicketHelpModel ValidateTicket(ModelHelpTicketValidation tic)
        {
            if(tic.Name == "" || tic.Name == null)
            {
                return  new ValidateTicketHelpModel(false,"You have to fill email address!");
            }
            Ticket t = unitOfWork.Tickets.GetTicketWithInclude(tic.Id);
            if(t == null)
            {
                return new ValidateTicketHelpModel(false, "There is not ticket with id: " + tic.Id + "!");
            }

            

            if(tic.Name != t.ApplicationUser.Email )
            {
                string s = "User with email: " + tic.Name + " did not buy ticket with Id: " + tic.Id;
                return new ValidateTicketHelpModel(false, s);
            }
            else
            {
                DateTime pr = (DateTime)t.PurchaseTime;
                DateTime dt = DateTime.Now;
                if (t.TicketTypeId == 1)
                {
                    DateTime aa = pr.AddHours(1);
                    if (aa < DateTime.Now)
                    {
                        return new ValidateTicketHelpModel(false, "Ticket with id " + tic.Id + " is not valid. Time is up!");
                    }
                    else
                    {
                        return new ValidateTicketHelpModel(true, "Ticket with id " + tic.Id + " is valid!");
                    }
                    
                }
                if(t.TicketTypeId == 2)
                {
                    
                    if(pr.Year < dt.Year)
                    {
                        return new ValidateTicketHelpModel(false, "Ticket with id " + tic.Id + " is not valid. Time is up!");
                    }else if(pr.Year == dt.Year)
                    {
                        if(pr.Month < dt.Month)
                        {
                            return new ValidateTicketHelpModel(false, "Ticket with id " + tic.Id + " is not valid. Time is up!");
                        }
                        else if(pr.Month == dt.Month)
                        {
                            if(pr.Day == dt.Day)
                            {
                                return new ValidateTicketHelpModel(true, "Ticket with id " + tic.Id + " is valid!");
                            }
                            else
                            {
                                return new ValidateTicketHelpModel(false, "Ticket with id " + tic.Id + " is not valid. Time is up!");
                            }
                        }
                    }
                }

                if (t.TicketTypeId == 3)
                {
                    
                    if (pr.Year < dt.Year)
                    {
                        return new ValidateTicketHelpModel(false, "Ticket with id " + tic.Id + " is not valid. Time is up!");
                    }
                    else if (pr.Year == dt.Year)
                    {
                        if (pr.Month == dt.Month)
                        {
                            return new ValidateTicketHelpModel(true, "Ticket with id " + tic.Id + " is valid!");
                        }
                        else
                        {
                            return new ValidateTicketHelpModel(false, "Ticket with id " + tic.Id + " is not valid. Time is up!");
                        }
                    }
                }

                if(t.TicketTypeId == 4)
                {
                    if (pr.Year == dt.Year)
                    {
                        return new ValidateTicketHelpModel(true, "Ticket with id " + tic.Id + " is valid!");
                    }
                    else
                    {
                        return new ValidateTicketHelpModel(false, "Ticket with id " + tic.Id + " is not valid. Time is up!");
                    }
                }

                return new ValidateTicketHelpModel(true, "Ticket with id " + tic.Id + " is valid!");
            }
        }



        // POST: api/Tickets
        [Route("Add")]
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult PostTicket(TicketHelpModel thm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(thm.Ticket.Name != null && thm.Ticket.Name != "")
            {
                if(thm.Ticket.TicketTypeId != 1)
                {
                    return Content(HttpStatusCode.BadRequest, "Only signedIn users can buy this type of ticket!");
                }
            }else {
                ApplicationUser appu = UserManager.FindById(thm.Ticket.ApplicationUserId);
                if((appu.Activated == "NOT ACTIVATED" || appu.Activated == "PENDING" ) && thm.Ticket.TicketTypeId != 1)
                {
                    return Content(HttpStatusCode.BadRequest, "Only authorized users can buy this type of ticket!");
                }
            }


            try
            {
                Ticket t = new Ticket();
                t.PurchaseTime = thm.Ticket.PurchaseTime;
                t.TicketPricesId = unitOfWork.TicketPrices.Get(thm.Ticket.TicketPricesId).Id;

                t.TicketTypeId = unitOfWork.TicketTypes.Get(thm.Ticket.TicketTypeId.GetValueOrDefault()).Id;

                t.PayPalId = unitOfWork.PayPals.GetPayPal(thm.PayementId);

                t.Name = "Karta";
                if(thm.Ticket.ApplicationUserId  != null && thm.Ticket.ApplicationUserId != "")
                {
                    t.ApplicationUserId = UserManager.FindById(thm.Ticket.ApplicationUserId).Id;
                }
               
                

                unitOfWork.Tickets.Add(t);
                unitOfWork.Complete();
                return Ok(t.Id);
            }
            catch (Exception ex)
            {
                return NotFound();
            }

           
        }

    


        [Route("SendMail")]
        public string SendMail(Ticket ticket)
        {
           
               

            try
            {
               
                try
                {
                    string subject = "Ticket purchase";
                    string desc = $"Dear {ticket.Name}, Your purchase is successfull.\n Ticket price: {unitOfWork.TicketPrices.Get(ticket.TicketPricesId).Price}\n " +
                $"Ticket type:{unitOfWork.TicketTypes.Get((int)ticket.TicketTypeId).Name}\n" +
                $"Time of purchase: {ticket.PurchaseTime}\n" +
                $"Ticket is valid for the next hour.\n\n" +
                $"Thank you.";
                    var email = ticket.Name;
                    unitOfWork.Tickets.NotifyViaEmail(email, subject, desc);
                }
                catch { }
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest().ToString();
            }
            
                return "Ok";
            
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }


        [Route("GetTicketsForOneUser")]
        [HttpGet]
        //GET: api/Tickets
        public IEnumerable<ShowTicketHelpModel> GetTicketsForOneUser(string id)
        {
            ApplicationUser ap = UserManager.FindByEmail(id);
            PassengerType pt = unitOfWork.PassengerTypes.Get((int)ap.PassengerTypeId);

            List<Ticket> lista = unitOfWork.Tickets.getAllTicketsForUser(id).ToList();
            
            List<ShowTicketHelpModel> ret = new List<ShowTicketHelpModel>();
            foreach(Ticket t in lista)
            {
                ShowTicketHelpModel st = new ShowTicketHelpModel();
                st.Id = t.Id;
                st.PurchaseTime = t.PurchaseTime;
                double price = unitOfWork.TicketPrices.Get(t.TicketPricesId).Price;
                st.TicketPrice = price - (price * pt.Coefficient);
                st.TicketType = unitOfWork.TicketTypes.Get((int)t.TicketTypeId).Name;
                if(t.TicketTypeId == 1)
                {
                    st.ExparationTime = "Ticket expires an hour after the purchase time";
                }
                if (t.TicketTypeId == 2)
                {
                    st.ExparationTime = "Ticket expires by the end of the purchase day ";
                }
                if (t.TicketTypeId == 3)
                {
                    st.ExparationTime = "Ticket expires by the end of the purchase month";
                }
                if (t.TicketTypeId == 4)
                {
                    st.ExparationTime = "Ticket expires by the end of the purchase year";
                }
                ret.Add(st);
            }
            return ret;
        }

        [Route("CheckValidity")]
        //[HttpGet]
        public bool CheckValidity(ModelHelpTicketValidation tic)
        {
            
            if(tic.Name == null || tic.Name == "")
            {
                if(tic.Id == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                ApplicationUser a = UserManager.FindByEmail(tic.Name);
                if(a != null)
                {
                    if(a.Activated != "ACTIVATED")
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
                else
                {
                    return false;
                }
            }
        }

        //private bool TicketExists(int id)
        //{
        //    return db.Tickets.Count(e => e.Id == id) > 0;
        //}
    }
}