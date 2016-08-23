
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Squid.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Squid.Controllers
{
    public static class DocumentDBRepository<T> where T : class
    {
        private static readonly string DatabaseId = ConfigurationManager.AppSettings["database"];
        private static readonly string CollectionId = ConfigurationManager.AppSettings["collection"];
        private static DocumentClient client;

        public static void Initialize()
        {
            client = new DocumentClient(new Uri(ConfigurationManager.AppSettings["endpoint"]), ConfigurationManager.AppSettings["authKey"]);
            CreateDatabaseIfNotExistsAsync().Wait();
            CreateCollectionIfNotExistsAsync().Wait();
        }

        private static async Task CreateDatabaseIfNotExistsAsync()
        {
            try
            {
                await client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(DatabaseId));
            }
            catch (DocumentClientException e)
            {
                if (e.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    await client.CreateDatabaseAsync(new Database { Id = DatabaseId });
                }
                else
                {
                    throw;
                }
            }
        }

        private static async Task CreateCollectionIfNotExistsAsync()
        {
            try
            {
                await client.ReadDocumentCollectionAsync(UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId));
            }
            catch (DocumentClientException e)
            {
                if (e.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    await client.CreateDocumentCollectionAsync(
                        UriFactory.CreateDatabaseUri(DatabaseId),
                        new DocumentCollection { Id = CollectionId },
                        new RequestOptions { OfferThroughput = 1000 });
                }
                else
                {
                    throw;
                }
            }
        }

        public static async Task<int> AddDecoder(Decoder decoder)
        {
            try
            {
                decoder.UpdateFieldsFromXml();
                Document document = await client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId), decoder);
                return (int)(dynamic)document.Id;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public static async Task<bool> UpdateDecoder(Decoder updatedDecoder)
        {
            bool mustRefreshToolbox = false;
            try
            {
                updatedDecoder.UpdateFieldsFromXml();
                Document document = await client.ReadDocumentAsync(UriFactory.CreateDocumentUri(DatabaseId, CollectionId, updatedDecoder.Id.ToString()));
                Decoder decoder = (Decoder)(dynamic)document;
                if (decoder != null)
                {
                    if (decoder.Name != updatedDecoder.Name || decoder.Version != updatedDecoder.Version
                        || decoder.Category != updatedDecoder.Category
                        || decoder.Parameters != updatedDecoder.Parameters || decoder.Tags != updatedDecoder.Tags
                        || decoder.Editable != updatedDecoder.Editable)
                    {
                        mustRefreshToolbox = true;
                    }
                    await client.ReplaceDocumentAsync(UriFactory.CreateDocumentUri(DatabaseId, CollectionId, updatedDecoder.Id.ToString()), updatedDecoder);
                    return mustRefreshToolbox;
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
        }

        public static async Task<Decoder> GetDecoder(int? id)
        {
            try
            {
                Document document = await client.ReadDocumentAsync(UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id.ToString()));
                Decoder decoder = (Decoder)(dynamic)document;
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
        }

        //public static Dictionary<string, List<BlockInfos>> GetCategoryInfos()
        //{
        //    try
        //    {
        //        //maybe tolist needed
        //        var fromServer =
        //            client.CreateDocumentQuery<Decoder>(
        //        UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId)).Select(d => new { d.Category, d.Id, d.Name, d.Parameters, d.Tags, d.Version, d.Editable });//..Select(d => new { d.Category, d.Id, d.Name, d.Parameters, d.Tags, d.Version, d.Editable }).ToList();
        //        var categoryInfos =
        //            fromServer.GroupBy(d => d.Category, d => new BlockInfos((int)d.Id, d.Name, d.Category, d.Parameters, d.Tags, d.Version, d.Editable))
        //                .ToDictionary(d => d.Key, d => d.ToList());
        //        return categoryInfos;
        //    }
        //    catch (Exception e)
        //    {
        //        throw;
        //    }
        //}

        public static IEnumerable<BlockInfos> GetAllBlockInfos()
        {
            //maybe Tolist() needed
            try
            {
                var fromServer =
                     client.CreateDocumentQuery<Decoder>(
                     UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId))
                    .Select(d => new BlockInfos((int)d.Id, d.Name, d.Category, d.Parameters, d.Tags, d.Version, d.Editable));
                return fromServer;

            }
            catch (Exception e)
            {
                throw;
            }
        }

        public static async Task<List<string>> FindProcedureUsages(int? id)
        {
            try
            {
                Document document = await client.ReadDocumentAsync(UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id.ToString()));
                Decoder decoder = (Decoder)(dynamic)document;
                if (decoder != null)
                {
                    var proceduresThatUseIt =
                                client.CreateDocumentQuery<Decoder>(
                                UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId)).Where(d => d.BlocklyDef.Contains("<mutation name=\"" + decoder.Name + "\">")).Select(d => d.Name).ToList();
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
        }

        public static async Task DeleteDecoder(int? id)
        {
            try
            {
                Uri docUri = UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id.ToString());
                await client.DeleteDocumentAsync(docUri);
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public static async Task<List<Decoder>> FindDescendants(int? id)
        {
            try
            {
                Document document = await client.ReadDocumentAsync(UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id.ToString()));
                Decoder decoder = (Decoder)(dynamic)document;
                if (decoder != null)
                {
                    var names = new List<string>();
                    var decoders = new List<Decoder>();
                    var firsts = decoder.FindDescendants();
                    foreach (var name in firsts)
                    {
                        if (!names.Exists(x => x == name))
                        {
                            names.Add(name);
                        }
                    }

                    for (int i = 0; i < names.Count; i++)
                    {
                        var curName = names[i];
                        var descendant =
                            client.CreateDocumentQuery<Decoder>(
                            UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId))
                            .Single(d => d.Name == curName);
                        var namesToAdd = descendant.FindDescendants();
                        foreach (var name in namesToAdd)
                        {
                            if (!names.Exists(x => x == name))
                            {
                                names.Add(name);
                            }
                        }
                        decoders.Add(descendant);
                    }
                    return decoders;
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
        }
    }

    public class BlockInfos
    {
        public int id;

        public string name;

        public string category;

        public string parameters;

        public string tags;

        public string version;

        public bool editable;

        public BlockInfos(int id, string name, string category, string parameters, string tags, string version, bool editable)
        {
            this.id = id;
            this.name = name;
            this.category = category;
            this.parameters = parameters;
            this.tags = tags;
            this.version = version;
            this.editable = editable;
        }
    }
}


