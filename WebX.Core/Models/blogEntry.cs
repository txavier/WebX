using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebX.Core.Models
{
    partial class blogEntry
    {
        //public string monthAbbreviation { get; set; }

        //public int day { get; set; }

        //public int year { get; set; }

        public int blogEntryId { get; set; }

        public string title { get; set; }

        public int authorId { get; set; }

        public author author { get; set; }

        public IEnumerable<blogTag> blogTags { get; set; }

        public IEnumerable<blogCategory> blogTopics { get; set; }

        public DateTime publishedDate { get; set; }

        public string imageBase64String { get; set; }

        public string blogBodyHtml { get; set; }

        public string blogBodySummaryHtml { get; set; }

    }
}
