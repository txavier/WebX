using AutoClutch.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebX.Core.Interfaces
{
    public interface ISettingService : IService<WebX.Core.Models.setting>
    {
        string GetSettingValueBySettingKey(string settingKey);
    }
}
