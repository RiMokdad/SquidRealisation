using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Squid.Controllers
{
    using System.Web.Script.Serialization;

    using Squid.Models;
    using Squid.Services;

    public class DecodersController : ApiController
    {
       
        [Route("api/Decoders")]
        [HttpPost]
        public IHttpActionResult PostDecoder(Decoder decoder)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var services = new DecoderServices();
                if (decoder.Id == null)
                {
                    var decoderId = services.AddDecoder(decoder);
                    MyHub.NotifyRefresh();
                    return Json(new { id = decoderId });
                }
                else
                {
                    var mustRefreshToolbox = services.UpdateDecoder(decoder);
                    if (mustRefreshToolbox)
                    {
                        MyHub.NotifyRefresh();
                    }
                    return Json(new { id = decoder.Id });
                }
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [Route("api/Decoders/decoderdef")]
        [HttpPost]
        public IHttpActionResult GetDecoderDef([FromBody]int? id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var services = new DecoderServices();
                var decoder = services.GetDecoder(id);
                return Json(new { decoder.Name, decoder.Version, decoder.Category, decoder.Tags, decoder.Xml });

            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [Route("api/Decoders/blocksinfos")]
        [HttpPost]
        public IHttpActionResult GetAllBlockInfos()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                    //return Json(new { error = "modèle non valide" });
                }
                var services = new DecoderServices();
                //var map = services.GetCategoryInfos();
                //return Json(new JavaScriptSerializer().Serialize(map));
                var list = services.GetAllBlockInfos();
                return Json(list.ToArray());

            }
            catch (Exception e)
            {
                //return Json(new { error = e.ToString() });
                return InternalServerError(e);
            }
        }

        [Route("api/Decoders/findusages")]
        [HttpPost]
        public IHttpActionResult FindUsages([FromBody]int? id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var services = new DecoderServices();
                var list = services.FindProcedureUsages(id);
                return Json(list.ToArray());

            }
            catch (Exception e)
            {
                //return Json(new { error = e.ToString() });
                return InternalServerError(e);
            }
        }

        [Route("api/Decoders/delete")]
        [HttpPost]
        public IHttpActionResult DeleteDecoder([FromBody]int? id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                    //return Json(new { error = "modèle non valide" });
                }
                var services = new DecoderServices();
                services.DeleteDecoder(id);
                return Ok();
            }
            catch (Exception e)
            {
                //return Json(new { error = e.ToString() });
                return InternalServerError(e);
            }
        }
    }
}
