using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static WebApp.Models.Enums;

namespace WebApp.Models
{
    public class Timetable
    {
        public int Id { get; set; }
        public DayType Day { get; set; }
        public string Departures { get; set; }
        public int Line { get; set; }
    }
}