using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class DayType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public DayType() { }

        public DayType(string name)
        {
            Name = name;
        }
    }
}