using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;
using System.Security.Claims;
using WebReactSite.ViewModels;

namespace WebReactSite.Services.Interfaces
{
    public interface IUserService
    {
        User GetUser(string userName);
        User SignIn(string login, string password);
        User Create(string login, string password, string email);
        IEnumerable<User> GetAll();
        IReadOnlyCollection<Claim> GetIdentity(string username);
        string GetToken(IReadOnlyCollection<Claim> identity);
        User GetUserByName(string name);
        bool IsNameInUse(string name);
        User GetUserByEmail(string email);
        Task<string> UploadUserImage(AddUserAvatarRequest request);
        object RefreshToken(string token, string refToken);

    }
}
