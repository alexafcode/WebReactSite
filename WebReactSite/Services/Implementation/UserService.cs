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
using System.Security.Cryptography;
using System.Text;

namespace WebReactSite.Services.Implementation
{
    public class UserService : IUserService
    {
        IUserRepository _repository;
        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }
        public User GetUser(string userName)
        {
            return _repository.GetUser(userName);
        }

        public User SignIn(string login, string password)
        {
            var user = _repository.GetUser(login);
            if (user == null)
                throw new Exception("User name or password incorrect");
            var verifyPassword = VerifyMd5Hash(password, user.Password);
            if(!verifyPassword)
                throw new Exception("User name or password incorrect");
            return user;
        }
        public User Create(string login, string password, string email)
        {
            if (IsNameInUse(login))
                throw new Exception("User name in Use");
            if (IsEmailInUse(email))
                throw new Exception("User email in Use");

            User user = new User();
            var hash = getMd5Hash(password);
            user.Login = login;
            user.Password = hash;
            user.Email = email;
            var result = _repository.Create(user);
            if(result != null)
            {
                return result;
            }
            return null;            
        }
        public IEnumerable<User> GetAll()
        {
            return _repository.GetAll();
        }
        public IReadOnlyCollection<Claim> GetIdentity(string username)
        {
            List<Claim> claims = null;
            claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, username)
            };
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
        public User GetUserByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return null;
            return _repository.GetUserByName(name) ?? null;
        }
        public bool IsNameInUse(string name)
        {
            var user = GetUserByName(name);
            return user == null ? false : true;
        }
        public User GetUserByEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                    return null;
                return _repository.GetUserByEmail(email) ?? null;
        }
        public bool IsEmailInUse(string email)
        {
            var user = GetUserByEmail(email);
            return user == null ? false : true;
        }
        static string getMd5Hash(string input)
        {
            MD5CryptoServiceProvider md5Hasher = new MD5CryptoServiceProvider();

            byte[] data = md5Hasher.ComputeHash(Encoding.Default.GetBytes(input));

            StringBuilder sBuilder = new StringBuilder();

            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            return sBuilder.ToString();
        }
        static bool VerifyMd5Hash(string input, string hash)
        {
            string hashOfInput = getMd5Hash(input);
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;

            if (0 == comparer.Compare(hashOfInput, hash))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
