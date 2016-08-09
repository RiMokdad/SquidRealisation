﻿using System;
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
        public void Hello()
        {
            Clients.All.hello();           
        }

        public void Refresh()
        {
            try
            {
                var services = new DecoderServices();
                var map = services.GetCategoryInfos();
                var jsonMap =new JavaScriptSerializer().Serialize(map);
                Clients.All.getCategories(jsonMap);

            }
            catch (Exception e)
            {
                //return Json(new { error = e.ToString() });
                Clients.All.displayMessage(e.ToString());
            }
        }

        public int? Save(Decoder decoder)
        {
            try
            {
                var services = new DecoderServices();
                if (decoder.Id == null)
                {
                    var decoderId = services.AddDecoder(decoder);
                    return decoderId;
                }
                else
                {
                    services.UpdateDecoder(decoder);
                    return decoder.Id;
                }
            }
            catch (Exception e)
            {
                Clients.Caller.displayMessage(e.ToString());
                return null;
            }
        }
    }
}