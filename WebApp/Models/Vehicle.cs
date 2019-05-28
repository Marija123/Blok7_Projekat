using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Type { get; set; }

        public List<Timetable> Timetables { get; set; }
    }
}