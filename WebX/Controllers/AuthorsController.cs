using AutoClutch.Controller;
using AutoClutch.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebX.Core.Models;

namespace WebX.Controllers
{
    public class AuthorsController : ODataApiController<author>
    {
        public AuthorsController(IService<author> authorService)
            : base(authorService)
        { }
    }
}