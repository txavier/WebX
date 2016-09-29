using AutoClutch.Core.Interfaces;
using WebX.Core.Interfaces;
using WebX.Core.Models;
using WebX.Core.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebX.Core.Services
{
    class MetricService : IMetricService
    {
        private IEfQueryContractTotalsPerSection _efQueryContractTotalsPerSection;

        private IService<engineer> _engineerService;

        public MetricService(IEfQueryContractTotalsPerSection efQueryContractTotalsPerSection, IService<engineer> engineerService)
        {
            _efQueryContractTotalsPerSection = efQueryContractTotalsPerSection;

            _engineerService = engineerService;
        }

        public IEnumerable<ViewModels.GraphViewModel> QueryContractTotalsPerSection()
        {
            var result = _efQueryContractTotalsPerSection.QueryContractTotalsPerSection();

            return result;
        }

    }
}
