using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;

namespace WebReactSite.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUser(string userName);
        Task Create(User user);
        IEnumerable<User> GetAll();
    }
}
