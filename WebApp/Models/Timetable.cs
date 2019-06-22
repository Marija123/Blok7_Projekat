using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Timetable
    {
        public int Id { get; set; }
        public string Departures { get; set; }
        public List<Vehicle> Vehicles { get; set; }

        public int Version { get; set; }

        [ForeignKey("Line")]
        public int LineId { get; set; }
        public Line Line { get; set; }

        [ForeignKey("DayType")]
        public int DayTypeId { get; set; }
        public DayType DayType { get; set; }
        
    }
}