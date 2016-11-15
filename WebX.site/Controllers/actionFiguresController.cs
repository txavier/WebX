using Auto.Controller.Objects;
using WebX.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoClutch.Core.Interfaces;

namespace WebX.Site.Controllers
{
    public class actionFiguresController : ODataApiController<blogEntry>
    {
        public actionFiguresController(IService<blogEntry> actionFigureService)
            : base(actionFigureService)
        { }

        //public IHttpActionResult Get()
        //{
        //    return Ok(User.Identity.Name);
        //}
    }
}