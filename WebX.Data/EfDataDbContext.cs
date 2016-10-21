namespace WebX.Data
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Core.Models;
    using TrackerEnabledDbContext.Common.Extensions;

    public partial class EfDataDbContext : TrackerEnabledDbContext.TrackerContext
    {
        public EfDataDbContext()
            : base("name=DefaultConnection")
        {
        }

        public virtual DbSet<user> users { get; set; }

        public virtual DbSet<userActionLog> userActionLogs { get; set; }

        public virtual DbSet<setting> settings { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            TrackingConfig.SetTrackingProperties(modelBuilder);
        }
    }
}
