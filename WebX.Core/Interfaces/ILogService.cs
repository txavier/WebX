using System.Collections.Generic;
using WebX.Core.Models;
using System.Threading.Tasks;
using WebX.Core.Objects;
using AutoClutch.Core.Interfaces;

namespace WebX.Core.Interfaces
{
    public interface ILogService : IService<userActionLog>
    {
        IEnumerable<userActionLog> GetLatestUserActionLogs(int take = 10);

        Task<userActionLog> InfoAsync(string typeName, string typeFullName, int recordId, EventType eventType, string message, string entityName, string loggedInUserName, string toString = null);

        userActionLog Info(string typeName, string typeFullName, int recordId, EventType eventType, string message, string entityName, string loggedInUserName);
    }

    public interface ILogService<TEntity> : IService<userActionLog>
    {
        IEnumerable<userActionLog> GetLatestUserActionLogs(int take = 10);

        Task<userActionLog> InfoAsync(TEntity entity, int recordId, EventType eventType, string message = null, string entityName = null, string loggedInUserName = null, bool useToString = false);

        userActionLog Info(TEntity entity, int recordId, EventType eventType, string message = null, string entityName = null, string loggedInUserName = null);

        Task<userActionLog> InfoAsync(string message);

        userActionLog Info(string message);

    }
}