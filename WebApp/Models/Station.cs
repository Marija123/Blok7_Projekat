using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Station
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<int> Lines { get; set; }
    }
}