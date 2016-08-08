using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SquidServer.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.IO;
    using System.Xml;

    public class Decoder
    {
        public Decoder()
        {
            this.Editable = true;
        }

        public Decoder(string xml, string code)
        {
            this.Xml = xml;
            this.Code = code;
            this.Editable = true;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }

        public string Name { get; set; }

        public string Xml { get; set; }

        public string Code { get; set; }

        public string FrenchSpec { get; set; }

        public bool Editable { get; set; }

        public string Category { get; set; }

        public string Tags { get; set; }

        public string Parameters { get; set; }

        public void UpdateFieldsFromXml()
        {
            using (XmlReader reader = XmlReader.Create(new StringReader(this.Xml)))
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
                    reader.ReadToFollowing("field");
                    //this.Name = reader.ReadElementContentAsString();
                }
                /*else
                {
                    this.Name = reader.ReadElementContentAsString();
                }*/
                this.Name = reader.ReadElementContentAsString();
                //skip Version field
                reader.ReadToFollowing("field");

                this.Category = reader.ReadElementContentAsString();
                this.Tags = reader.ReadElementContentAsString();
            }
        }
    }
}
