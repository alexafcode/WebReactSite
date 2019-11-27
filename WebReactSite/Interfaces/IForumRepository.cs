using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;

namespace WebReactSite.Interfaces
{
    public interface IForumRepository
    {
        IEnumerable<ForumTheme> GetForumTheme();
        Task AddForumTheme(ForumTheme ft);
        Task AddPost (Post post);
        IEnumerable<Post> GetPosts();
    }
}
