using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class SerialNumberSLRepository : Repository<SerialNumberSL, int>, ISerialNumberSLRepository
    {
        public SerialNumberSLRepository(DbContext context) : base(context)
        {
        }
    }
}