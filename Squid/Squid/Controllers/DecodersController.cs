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
    using System.Threading.Tasks;

    public class DecodersController : ApiController
    {
       
        [Route("api/Decoders")]
        [HttpPost]
        public async Task<IHttpActionResult> PostDecoder(Decoder decoder)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (decoder.Id == null)
                {
                    var decoderId = await DocumentDBRepository<Decoder>.AddDecoder(decoder);
                    MyHub.NotifyRefresh();
                    return Json(new { id = decoderId });
                }
                else
                {
                    var mustRefreshToolbox = await DocumentDBRepository<Decoder>.UpdateDecoder(decoder);
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
        public async Task<IHttpActionResult> GetDecoderDef([FromBody]int? id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var decoder = await DocumentDBRepository<Decoder>.GetDecoder(id);
                return Json(new { decoder.Name, decoder.Version, decoder.Category, decoder.Tags, decoder.BlocklyDef });

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
                //var map = services.GetCategoryInfos();
                //return Json(new JavaScriptSerializer().Serialize(map));
                var list = DocumentDBRepository<Decoder>.GetAllBlockInfos();
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
        public async Task<IHttpActionResult> FindUsages([FromBody]int? id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var list = await DocumentDBRepository<Decoder>.FindProcedureUsages(id);
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
        public async Task<IHttpActionResult> DeleteDecoder([FromBody]int? id)
        {
            //maybe async is needed
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                    //return Json(new { error = "modèle non valide" });
                }
                await DocumentDBRepository<Decoder>.DeleteDecoder(id);
                return Ok();
            }
            catch (Exception e)
            {
                //return Json(new { error = e.ToString() });
                return InternalServerError(e);
            }
        }

        [Route("api/Decoders/descendants")]
        [HttpPost]
        public async Task<IHttpActionResult> FindDescendants([FromBody]int? id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var list = await DocumentDBRepository<Decoder>.FindDescendants(id);
                return Json(list.ToArray());

            }
            catch (Exception e)
            {
                //return Json(new { error = e.ToString() });
                return InternalServerError(e);
            }
        }
    }
}
