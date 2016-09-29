using System.Collections.Generic;

namespace WebX.Core.Interfaces
{
    public interface IMetricService
    {
        IEnumerable<ViewModels.GraphViewModel> QueryContractTotalsPerSection();
    }
}