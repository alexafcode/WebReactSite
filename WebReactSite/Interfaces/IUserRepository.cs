using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;

namespace WebReactSite.Interfaces
{
    public interface IUserRepository
    {
        User GetUser(string userName);
        User Create(User user);
        IEnumerable<User> GetAll();
        User GetUserByName(string name);
        User GetUserByEmail(string email);
        Task UpdateUser(User user);
    }
}
