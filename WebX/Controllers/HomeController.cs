using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebX.Controllers
{
    //[Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //var root = VirtualPathUtility.ToAbsolute("~/");

            //if ((root != Request.ApplicationPath) && (Request.ApplicationPath == Request.Path))
            //{
            //    return Redirect(root + "#");
            //}
            //else
            //{
                return View();
            //}

        }
    }
}
