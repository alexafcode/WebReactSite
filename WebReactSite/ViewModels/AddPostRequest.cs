using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebReactSite.ViewModels
{
    public class AddPostRequest
    {
        [Required]
        public int ForumId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Header { get; set; }
        [Required]
        [StringLength(3000, MinimumLength = 5)]
        public string Description { get; set; }
    }
}
