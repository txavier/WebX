using System.Collections.Generic;

namespace WebX.Core.Interfaces
{
    public interface IAuthorizeService
    {
        string IsAuthorized(string userName, bool? loginRequired, string permissionCheckType, string requiredPermissions, string uri, List<KeyValuePair<string, string>> parameters);
    }
}