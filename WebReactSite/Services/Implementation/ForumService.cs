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
    }
}
