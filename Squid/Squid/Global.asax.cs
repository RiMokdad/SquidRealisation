using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace Squid
{
    using System.Web.Http;
    using System.Web.Http.Dispatcher;
    using System.Web.Routing;

    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {

            //Type controllerType = typeof(SquidServer.Controllers.DecodersController);          
           // GlobalConfiguration.Configuration.Services.Replace(typeof(IAssembliesResolver), new CustomAssembliesResolver());
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Attribute routing.
            config.MapHttpAttributeRoutes();

            // Convention-based routing.
             config.Routes.MapHttpRoute(
                 name: "DefaultApi",
                 routeTemplate: "api/{controller}/{id}",
                 defaults: new { id = RouteParameter.Optional }
             );
        }
    }

    /*internal class CustomAssembliesResolver : DefaultAssembliesResolver
    {
        public override ICollection<System.Reflection.Assembly> GetAssemblies()
        {
            var assemblies = base.GetAssemblies();

            // Interestingly, if we push the same assembly twice in the collection,
            // an InvalidOperationException suggests that there is different 
            // controllers of the same name (I think it's a bug of WebApi 2.1).
            var customControllersAssembly = typeof(DecodersController).Assembly;
            if (!assemblies.Contains(customControllersAssembly))
                assemblies.Add(customControllersAssembly);

            return assemblies;
        }
    }*/
}