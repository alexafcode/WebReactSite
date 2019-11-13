using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;
using System.Security.Claims;

namespace WebReactSite.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUser(string userName);
        //Task Create(User user);
        Task<User> Create(string login, string password, string email);
        IEnumerable<User> GetAll();
        Task<IReadOnlyCollection<Claim>> GetIdentity(string username, string password);
        string GetToken(IReadOnlyCollection<Claim> identity);
    }
}
