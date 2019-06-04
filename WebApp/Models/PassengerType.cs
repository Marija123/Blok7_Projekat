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

        public PassengerType() { }

        public PassengerType(string name)
        {
            Name = name;
            if(name == "Student")
            {
                Coefficient = 0.6;
            }
            else if(name == "Retiree")
            {
                Coefficient = 0.8;
            }
            else
            {
                Coefficient = 1;
            }
        }

        //public List<ApplicationUser> ApplicationUsers { get; set; }
    }
}