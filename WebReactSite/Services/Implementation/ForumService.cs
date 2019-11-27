using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;
using WebReactSite.Services.Interfaces;
using WebReactSite.Interfaces;
using WebReactSite.ViewModels;

namespace WebReactSite.Services.Implementation
{
    public class ForumService : IForumService
    {
        IForumRepository _repository;
        public ForumService(IForumRepository repository)
        {
            _repository = repository;
        }
        public async Task AddForumTheme(AddForumThemeRequest request)
        {
            ForumTheme ft = new ForumTheme() { Header = request.Header, Description = request.Description, Icon = request.Icon };
            await _repository.AddForumTheme(ft);
        }
        public IEnumerable<ForumTheme> GetForumThemes()
        {
            try
            {
                return _repository.GetForumTheme();
            }
            catch(Exception e)
            {
                throw new ApplicationException(e.Message);
            }
        }
        public async Task AddPost(AddPostRequest request)
        {
            DateTime now = DateTime.Now;
            //string sqlFormattedDate = now.ToString("dd-MM-yyyy HH:mm:ss.fff");
            //ToDo tags
            Post post = new Post() { ForumId = request.ForumId, Header = request.Header, Description = request.Description, CreatedDate = now };
            await _repository.AddPost(post);
        }
        public IEnumerable<Post> GetPosts(int id)
        {
            try
            {
                return _repository.GetPosts(id);
            }
            catch(Exception e)
            {
                throw new ApplicationException(e.Message);
            }
        }
    }
}
