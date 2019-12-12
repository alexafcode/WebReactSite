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
        IUserRepository _userRepository;
        public ForumService(IForumRepository repository, IUserRepository userRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
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
            Post post = new Post() { ForumId = request.ForumId, Header = request.Header, Description = request.Description, CreatedDate = now };
            int postId = await _repository.AddPost(post);
            var tags = new List<Tag>();
            foreach(var tag in request.Tags)
            {
                var newTag = new Tag() { PostId = postId, TagName = tag };
                tags.Add(newTag);
            }
            await _repository.AddTags(tags);
        }
        public IEnumerable<Post> GetPostsByForumId(int id)
        {
            try
            {
                return _repository.GetPostsByForumId(id);
            }
            catch(Exception e)
            {
                throw new ApplicationException(e.Message);
            }
        }
        public Post GetPostByPostId(int id)
        {
            try
            {
                return _repository.GetPostByPostId(id);
            }
            catch(Exception e)
            {
                throw new ApplicationException(e.Message);
            }
        }
        public async Task AddComment(AddCommentRequest request)
        {
            DateTime now = DateTime.Now;
            User user = _userRepository.GetUserByName(request.Author);
            string avatar = user.UserAvatar;
            Comment comment = new Comment { PostId = request.PostId, Body = request.Body, Author = user.Login, AuthorAvatar = avatar, CreateDate = now };
            await _repository.AddComment(comment);
        }
    }
}
