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
        public void Hello()
        {
            Clients.All.hello();           
        }

        public void NotifyRefresh()
        {
            Clients.All.notifyRefresh();
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

        public object SendDecoderDef(int id)
        {
            try
            {
                var services = new DecoderServices();
                var decoder = services.GetDecoder(id);
                var decoderDef = new { decoder.Name, decoder.Version, decoder.Category, decoder.Tags, decoder.Xml };
                //Clients.Caller.getDecoderDef(decoderDef);
                return decoderDef;

            }
            catch (Exception e)
            {
                Clients.Caller.displayMessage(e.ToString());
                return null;
            }
        }

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

        public void DeleteDecoder(int id)
        {
            try
            {
                var services = new DecoderServices();
                services.DeleteDecoder(id);
                Clients.Caller.displayMessage("Décodeur supprimé !");
            }
            catch (Exception e)
            {
                Clients.Caller.displayMessage(e.ToString());
            }
        }
    }
}