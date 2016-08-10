using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Squid
{
    using System.Web.Http;
    using System.Web.Script.Serialization;

    using Squid.Models;
    using Squid.Services;

    public class MyHub : Hub
    {
        private static readonly IHubContext context = GlobalHost.ConnectionManager.GetHubContext<MyHub>();

        public static void NotifyRefresh()
        {
            context.Clients.All.notifyRefresh();
        }
    }
}