using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Enums
    {
        public enum PassengerType
        {
            Student,
            Retiree,
            Regular
        }

        public enum DayType
        {
            WorkDay,
            Saturday,
            Sunday
        }

        public enum TicketType
        {
            Hourly,
            Daily,
            Monthly,
            Yearly
        }

    }
}