using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Line
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public List<int> Stations { get; set; }

    }
}