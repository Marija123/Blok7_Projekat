using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class ApplicationUserRepository : Repository<ApplicationUser, int>, IApplicationUserRepository
    {
        public ApplicationUserRepository(DbContext context) : base(context)
        {
        }
    }
}