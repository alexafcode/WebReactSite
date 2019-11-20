using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebReactSite.Models
{
    public class Post
    {
        public int PostId { get; set; }
        public int ForumId { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
