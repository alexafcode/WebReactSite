using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;
using WebReactSite.Services.Interfaces;
using WebReactSite.Interfaces;

namespace WebReactSite.Services.Implementation
{
    public class ForumService : IForumService
    {
        IForumRepository _repository;
        public ForumService(IForumRepository repository)
        {
            _repository = repository;
        }
    }
}
