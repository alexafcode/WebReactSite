using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;
using WebReactSite.ViewModels;

namespace WebReactSite.Services.Interfaces
{
    public interface IForumService
    {
        Task AddForumTheme(AddForumThemeRequest request);
        IEnumerable<ForumTheme> GetForumThemes();
        Task AddPost(AddPostRequest request);
        IEnumerable<Post> GetPostByID(int id);
    }
}
