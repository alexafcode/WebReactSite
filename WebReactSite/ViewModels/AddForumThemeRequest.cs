using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebReactSite.ViewModels
{
    public class AddForumThemeRequest
    {
        [Required]
        [StringLength(20, MinimumLength = 3)]
        public string Header { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 10)]
        public string Description { get; set; }
        [Required]
        public string Icon { get; set; }
    }
}
