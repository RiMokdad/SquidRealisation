using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Squid.Services
{
    using Squid.DAL;
    using Squid.Models;

    public class DecoderServices
    {
        //private DecoderContext db = new DecoderContext();

        public int? AddDecoder(Decoder decoder)
        {
            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
                decoder.UpdateFieldsFromXml();
                db.Decoders.Add(decoder);
                db.SaveChanges();
                return decoder.Id;
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                try
                {
                    db?.Dispose();
                }
                catch (Exception e)
                {
                    throw;
                }
            }
        }

        public int? UpdateDecoder(Decoder updatedDecoder)
        {
            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
                updatedDecoder.UpdateFieldsFromXml();
                var decoder = db.Decoders.Find(updatedDecoder.Id);
                if (decoder != null)
                {
                    /*decoder.Name = updatedDecoder.Name;
                    decoder.Version = updatedDecoder.Version;
                    decoder.Category = updatedDecoder.Category;
                    decoder.Tags = updatedDecoder.Tags;
                    decoder.Xml = updatedDecoder.Xml;
                    decoder.Code = updatedDecoder.Code;
                    decoder.FrenchSpec = updatedDecoder.FrenchSpec;
                    decoder.UpdateFieldsFromXml();*/
                    db.Entry(decoder).CurrentValues.SetValues(updatedDecoder);
                    db.SaveChanges();
                    return decoder.Id;
                }
                else
                {
                    throw new KeyNotFoundException();
                }
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                try
                {
                    db?.Dispose();
                }
                catch (Exception e)
                {
                    throw;
                }
            }
        }

        public Decoder GetDecoder(int? id)
        {
            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
                var decoder = db.Decoders.Find(id);
                if (decoder != null)
                {
                    if (decoder.Editable)
                    {
                        return decoder;
                    }
                    //return null;
                    throw new InvalidOperationException("Le décodeur n'est pas disponible pour édition");
                }
                else
                {
                    throw new KeyNotFoundException("L'ID envoyée ne correspond à aucun décodeur dans la base de donnée");
                }
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                try
                {
                    db?.Dispose();
                }
                catch (Exception e)
                {
                    throw;
                }
            }
        }

        public Dictionary<string, List<BlockInfos>> GetCategoryInfos()
        {

            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
                /* Dictionary<string, List<BlockInfos>> categoryInfos = db.Decoders
                     //.Select(d => new { d.Category, callInfos = new CallInfos(d.Id, d.Name, d.Parameters, d.Tags, d.Editable) })
                     .GroupBy(d => d.Category, d => new BlockInfos(d.Id, d.Name, d.Parameters, d.Tags, d.Editable))
                 .ToDictionary(g => g.Key, g => g.ToList());*/
                var fromServer =
                    db.Decoders.Select(d => new { d.Category, d.Id, d.Name, d.Parameters, d.Tags, d.Editable }).ToList();
                var categoryInfos =
                    fromServer.GroupBy(d => d.Category, d => new BlockInfos((int)d.Id, d.Name, d.Parameters, d.Tags, d.Editable))
                        .ToDictionary(d => d.Key, d => d.ToList());
                return categoryInfos;
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                try
                {
                    db?.Dispose();
                }
                catch (Exception e)
                {
                    throw;
                }
            }
        }

        public List<string> FindProcedureUsages(int? id)
        {
            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
                var decoder = db.Decoders.Find(id);
                if (decoder != null)
                {
                    var proceduresThatUseIt =
                                db.Decoders.Where(d => d.Xml.Contains("<mutation name=\"" + decoder.Name + "\">")).Select(d => d.Name).ToList();
                    return proceduresThatUseIt;
                }
                else
                {
                    throw new KeyNotFoundException();
                }
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                try
                {
                    db?.Dispose();
                }
                catch (Exception e)
                {
                    throw;
                }
            }
        }

        public void DeleteDecoder(int? id)
        {
            DecoderContext db = null;
            try
            {
                db = new DecoderContext();
                var decoder = db.Decoders.Find(id);
                if (decoder != null)
                {
                    db.Decoders.Remove(decoder);
                    db.SaveChanges();
                }
                else
                {
                    throw new KeyNotFoundException("L'ID envoyée ne correspond à aucun décodeur dans la base de donnée");
                }
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                try
                {
                    db?.Dispose();
                }
                catch (Exception e)
                {
                    throw;
                }
            }
        }

    }

    public class BlockInfos
    {
        public int id;

        public string name;

        public string parameters;

        public string tags;

        public string version;

        public bool editable;

        public BlockInfos(int id, string name, string parameters, string tags, string version, bool editable)
        {
            this.id = id;
            this.name = name;
            this.parameters = parameters;
            this.tags = tags;
            this.version = version;
            this.editable = editable;
        }
    }
}