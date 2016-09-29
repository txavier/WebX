using WebX.Core.ViewModels;
using System.Collections.Generic;

namespace WebX.Core.Interfaces
{
    public interface IEfQueryContractTotalsPerSection
    {
        IEnumerable<GraphViewModel> QueryContractTotalsPerSection();
    }
}