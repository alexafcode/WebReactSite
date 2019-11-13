using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;
using WebReactSite.Services.Interfaces;
using WebReactSite.Interfaces;
using WebReactSite.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

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
        public Task<User> Create(string login, string password, string email)
        {
            User user = new User();
            user.Login = login;
            user.Password = password;
            user.Email = email;
            return  _repository.Create(user);
        }
        public IEnumerable<User> GetAll()
        {
            return _repository.GetAll();
        }
        public async Task<IReadOnlyCollection<Claim>> GetIdentity(string username, string password)
        {
            List<Claim> claims = null;
            var user = await GetUser(username);
            if (user != null)
            {
                //ToDo check password decrypt
                if (user.Password == password)
                {
                    claims = new List<Claim>
                    {
                        new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login)
                    };
                }
            }
            return claims;
        }
        public string GetToken(IReadOnlyCollection<Claim> identity)
        {
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return encodedJwt;
        }
    }
}
