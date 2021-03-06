﻿namespace Squid.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.IO;
    using System.Xml;

    public class Decoder
    {
        public Decoder(
            string name, 
            string version, 
            string category, 
            string tags, 
            string blocklyDef, 
            string code, 
            string frenchSpec, 
            bool editable)
        {
            this.Name = name;
            this.Version = version;
            this.Category = category;
            this.Tags = tags;
            this.BlocklyDef = blocklyDef;
            this.Code = code;
            this.FrenchSpec = frenchSpec;
            this.Editable = editable;
        }

        public Decoder()
            : this(
                string.Empty, 
                string.Empty, 
                string.Empty, 
                string.Empty, 
                string.Empty, 
                string.Empty, 
                string.Empty, 
                false)
        {
        }

        public string BlocklyDef { get; set; }

        public string Category { get; set; }

        public string Code { get; set; }

        public bool Editable { get; set; }

        public string FrenchSpec { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }

        [Column(TypeName = "VARCHAR")]
        [StringLength(400)]
        [Index("NameIndex", IsUnique = true)]
        public string Name { get; set; }

        public string Parameters { get; set; }

        public string Tags { get; set; }

        public string Version { get; set; }

        public List<string> FindDescendants()
        {
            var descendants = new List<string>();
            using (var reader = XmlReader.Create(new StringReader(this.BlocklyDef)))
            {
                reader.ReadToFollowing("statement");
                if (reader.EOF)
                {
                    return descendants;
                }

                while (reader.ReadToFollowing("block"))
                {
                    if (reader.GetAttribute("type") != "procedures_callnoreturn") continue;

                    reader.ReadToFollowing("mutation");
                    descendants.Add(reader.GetAttribute("name"));
                }
            }

            return descendants;
        }

        public void UpdateFieldsFromXml()
        {
            using (var reader = XmlReader.Create(new StringReader(this.BlocklyDef)))
            {
                reader.ReadToFollowing("block");
                reader.ReadStartElement();

                // this.Parameters = reader.NodeType.ToString();
                // this.Parameters = reader.Name;

                // if there is parameters
                if (reader.Name == "mutation")
                {
                    var args = new List<string>();
                    reader.ReadToDescendant("arg");
                    do
                    {
                        args.Add(reader.GetAttribute("name"));
                    }
                    while (reader.ReadToNextSibling("arg"));

                    this.Parameters = string.Join(",", args.ToArray());

                    // reader.ReadToFollowing("field");
                }

                /*this.Name = reader.ReadElementContentAsString();
                //skip Version field
                reader.ReadToFollowing("field");

                this.Category = reader.ReadElementContentAsString();
                this.Tags = reader.ReadElementContentAsString();*/
            }
        }
    }
}