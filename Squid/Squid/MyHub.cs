﻿namespace Squid
{
    using System;
    using System.Collections.Generic;
    using System.Web.Script.Serialization;

    using Squid.Models;
    using Squid.Services;

    public class MyHub : Hub
    {
        public List<string> FindUsages(int id)
        {
            try
            {
                var services = new DecoderServices();
                var list = services.FindProcedureUsages(id);
                return list;
            }
            catch (Exception e)
            {
                Clients.Caller.displayMessage(e.ToString());
                return null;
            }
        }

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
                var jsonMap = new JavaScriptSerializer().Serialize(map);
                Clients.All.getCategories(jsonMap);
            }
            catch (Exception e)
            {
                // return Json(new { error = e.ToString() });
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

                services.UpdateDecoder(decoder);
                return decoder.Id;
            }
            catch (Exception e)
            {
                Clients.Caller.displayMessage(e.ToString());
                return null;
            }
        }

        public object SendDecoderDef(int id)
        {
            try
            {
                var services = new DecoderServices();
                var decoder = services.GetDecoder(id);
                var decoderDef = new { decoder.Name, decoder.Version, decoder.Category, decoder.Tags, decoder.Xml };

                // Clients.Caller.getDecoderDef(decoderDef);
                return decoderDef;
            }
            catch (Exception e)
            {
                Clients.Caller.displayMessage(e.ToString());
                return null;
            }
        }
    }
}