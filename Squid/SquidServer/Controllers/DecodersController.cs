using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace SquidServer.Controllers
{
    using SquidServer.Models;

    [Route("api/[controller]")]
    public class DecodersController : Controller
    {
        // GET: api/decoders
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/decoders/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/decoders
        [Route("api/Decoders/decoderdef")]
        [HttpPost]
        public JsonResult Post([FromBody]Decoder decoder)
        {
            decoder.Xml = "fsfsfsf";
            return this.Json(decoder.Xml);
        }

        // PUT api/decoders/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/decoders/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
