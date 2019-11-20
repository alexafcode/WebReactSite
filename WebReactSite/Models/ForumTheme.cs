using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebReactSite.Models
{
    public class ForumTheme
    {
        [Key]
        public int ForumId { get; set; }

        public string Header { get; set; }
        public string Description { get; set; }
    }
}
