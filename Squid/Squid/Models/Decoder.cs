using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Xml;

namespace Squid.Models
{
    public class Decoder
    {
        [JsonProperty(PropertyName = "id")]
        public int? Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "code")]
        public string Code { get; set; }

        [JsonProperty(PropertyName = "frenshSpec")]
        public string FrenshSpec { get; set; }

        [JsonProperty(PropertyName = "isEditable")]
        public bool Editable { get; set; }

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


        public void UpdateFieldsFromXml()
        {
            using (XmlReader reader = XmlReader.Create(new StringReader(this.BlocklyDef)))
            {
                reader.ReadToFollowing("block");
                reader.ReadStartElement();
                //this.Parameters = reader.NodeType.ToString();
                //this.Parameters = reader.Name;

                //if there is parameters
                if (reader.Name == "mutation")
                {
                    var args = new List<String> { };
                    reader.ReadToDescendant("arg");
                    do
                    {
                        args.Add(reader.GetAttribute("name"));
                    }
                    while (reader.ReadToNextSibling("arg"));

                    this.Parameters = String.Join(",", args.ToArray());
                    //reader.ReadToFollowing("field");
                }
                /*this.Name = reader.ReadElementContentAsString();
                //skip Version field
                reader.ReadToFollowing("field");
                this.Category = reader.ReadElementContentAsString();
                this.Tags = reader.ReadElementContentAsString();*/
            }
        }

        public List<string> FindDescendants()
        {
            var descendants = new List<string>();
            using (XmlReader reader = XmlReader.Create(new StringReader(this.BlocklyDef)))
            {
                reader.ReadToFollowing("statement");
                if (reader.EOF)
                {
                    return descendants;
                }
                while (reader.ReadToFollowing("block"))
                {
                    if (reader.GetAttribute("type") == "procedures_callnoreturn")
                    {
                        reader.ReadToFollowing("mutation");
                        descendants.Add(reader.GetAttribute("name"));
                    }
                }
            }
            return descendants;
        }
    }
}