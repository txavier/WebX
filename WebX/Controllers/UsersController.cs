using AutoClutch.Controller;
using AutoClutch.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.OData;
using WebX.Core.Models;

namespace WebX.Controllers
{
    public class UsersController : ApiController
    {
        public UsersController()
        { }

        public IHttpActionResult GetLoggedInUser()
        {
            return Ok(User.Identity.Name);
        }
    }
}