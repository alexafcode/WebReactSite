using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebReactSite.ViewModels
{
    public class AddCommentRequest
    {
        [Required]
        public int PostId { get; set; }
        [Required]
        [StringLength(300, MinimumLength = 3)]        
        public string Body { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Author { get; set; }
    }
}
