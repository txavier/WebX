﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebX.Core.Models
{
    [Table("blogEntry")]
    public partial class blogEntry
    {
        public blogEntry()
        {
            blogTags = new HashSet<blogTag>();

            blogTopics = new HashSet<blogCategory>();
        }

        [NotMapped]
        public string monthAbbreviation { get; set; }

        [NotMapped]
        public int day { get; set; }

        [NotMapped]
        public int year { get; set; }

        public int blogEntryId { get; set; }

        public string title { get; set; }

        public int authorId { get; set; }

        public author author { get; set; }

        public virtual ICollection<blogTag> blogTags { get; set; }

        public virtual ICollection<blogCategory> blogTopics { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime publishedDate { get; set; }

        public string imageBase64String { get; set; }

        public string blogBodyHtml { get; set; }

        [NotMapped]
        public string blogBodySummaryHtml
        {
            get
            {
                return GetBodySummaryHtml();
            }
            set
            {
            }
        }

        private string GetBodySummaryHtml()
        {
            var result = blogBodyHtml.Length > 839 ? blogBodyHtml.Substring(0, (int)Math.Round((double)blogBodyHtml.Length / 4)) + "..." :
                blogBodyHtml;           

            return result;
        }
    }
}
