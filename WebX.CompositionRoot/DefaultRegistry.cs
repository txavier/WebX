using AutoClutch.Repo.Interfaces;
using AutoClutch.Repo.Objects;
using StructureMap.Configuration.DSL;
using StructureMap;
using StructureMap.Graph;
//using StructureMap.Web;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebX.Data;
using WebX.Core.Interfaces;
using WebX.Infrastructure.Getters;
using WebX.Core.Services;
using AutoClutch.Core;
using AutoClutch.Core.Interfaces;
using AutoClutch.Repo;

namespace WebX.CompositionRoot
{
    public class DefaultRegistry : Registry
    {
        public DefaultRegistry()
        {
            Scan(scan =>
            {
                scan.TheCallingAssembly();
                scan.AssembliesFromApplicationBaseDirectory();
                scan.WithDefaultConventions();
            });

            For<DbContext>().Use<EfDataDbContext>();

            For(typeof(IService<>)).Use(typeof(Service<>));

            For(typeof(IRepository<>)).Use(typeof(Repository<>));

            For<IEnvironmentConfigSettingsGetter>().Use<EnvironmentConfigSettingsGetter>();

            For(typeof(ILogService<>)).Use(typeof(UserActionLogService<>));
        }
    }
}
