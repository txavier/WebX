using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebX.Core.Models
{
    [Table("blogCategory")]
    public class blogCategory
    {
        public blogCategory()
        {
        }

        public int blogCategoryId { get; set; }
        public string name { get; set; }
    }
}