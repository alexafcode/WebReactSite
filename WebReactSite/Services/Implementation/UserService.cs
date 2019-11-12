using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;
using WebReactSite.Services.Interfaces;
using WebReactSite.Interfaces;

namespace WebReactSite.Services.Implementation
{
    public class UserService : IUserService
    {
        IUserRepository _repository;
        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<User> GetUser(string userName)
        {
            return await _repository.GetUser(userName);
        }
        public Task Create(User user)
        {
            return  _repository.Create(user);
        }
        public IEnumerable<User> GetAll()
        {
            return _repository.GetAll();
        }
    }
}
