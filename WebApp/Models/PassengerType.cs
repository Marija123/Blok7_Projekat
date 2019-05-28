using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class PassengerType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Coefficient { get; set; }

        public List<ApplicationUser> ApplicationUsers { get; set; }
    }
}