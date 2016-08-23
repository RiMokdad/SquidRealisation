using Newtonsoft.Json;


namespace Squid.Models
{
    public class Decoder
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "code")]
        public string Code { get; set; }

        [JsonProperty(PropertyName = "frenshSpec")]
        public string FrenshSpec { get; set; }

        [JsonProperty(PropertyName = "isEditable")]
        public string Editable { get; set; }

        [JsonProperty(PropertyName = "category")]
        public string Category { get; set; }

        [JsonProperty(PropertyName = "version")]
        public string Version { get; set; }

        [JsonProperty(PropertyName = "tags")]
        public string Tags { get; set; }

        [JsonProperty(PropertyName = "parameters")]
        public string Parameters { get; set; }

        [JsonProperty(PropertyName = "blocklyDef")]
        public string BlocklyDef { get; set; }
    }
}