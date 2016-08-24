namespace Squid.DAL
{
    using System.Data.Entity;
    using System.Data.Entity.ModelConfiguration.Conventions;

    using Squid.Migrations;
    using Squid.Models;

    public class DecoderContext : DbContext
    {
        public DecoderContext()
            : base("DecoderContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<DecoderContext, Configuration>("DecoderContext"));
        }

        public DbSet<Decoder> Decoders { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}