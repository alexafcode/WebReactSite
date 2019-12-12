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
        Task<int> AddPost (Post post);
        Task AddTags(List<Tag> tags);
        IEnumerable<Post> GetPostsByForumId(int id);
        Post GetPostByPostId(int id);
        Task AddComment(Comment comment);
        Comment GetCommentById(int id);
    }
}
