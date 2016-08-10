namespace Squid
{
    using System;
    using System.Collections.Generic;
    using System.Web.Script.Serialization;
    using Microsoft.AspNet.SignalR;

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