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
using WebReactSite.ViewModels;
using System.IO;
using Microsoft.AspNetCore.StaticFiles;
using MimeTypes;

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
            user.RefToken = GenerateRefreshToken();
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

        public async Task<string> UploadUserImage(AddUserAvatarRequest request)
        {
            if (request.Image != null && request.Name != null)
            {
                string date = DateTime.Now.ToString("yyyyMMddTHHmm");
                var wwwroot = "wwwroot\\avatar";
                var avatarRoot = "\\avatar";
                var fileName = Path.GetFileName(request.Image.FileName);
                var ext = MimeTypes.MimeTypeMap.GetExtension(request.Image.ContentType);
                var FileNameWithExt = string.Concat(fileName, ext);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), wwwroot, FileNameWithExt);
                var image = request.Image;

                using var fileStream = new FileStream(filePath, FileMode.Create);
                await image.CopyToAsync(fileStream);
                
                var imagePath = Path.Combine(avatarRoot, FileNameWithExt).Replace('\\', '/');
                User user = _repository.GetUserByName(request.Name);
                user.UserAvatar = imagePath;
                await _repository.UpdateUser(user);
                return imagePath;
            }
            return null;
        }
        public object RefreshToken(string token, string refToken)
        {
            var principal = GetPrincipalFromExpiredToken(token);
            var userName = principal.Identity.Name;
            var user = GetUserByName(userName);
            if (user.RefToken != refToken)
                throw new SecurityTokenException("Invalid refresh Token");
            var identity = GetIdentity(userName);
            var newJwtToken = GetToken(identity);
            var newRefToken = GenerateRefreshToken();
            user.RefToken = newRefToken;
            _repository.UpdateUser(user);

            return new
            {
                token = newJwtToken,
                refToken = newRefToken
            };

        }
        public string GenerateRefreshToken()
        {
            var random = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(random);
            return Convert.ToBase64String(random);
        }
        //private User GetRefToken(string userName)
        //{
        //    return _repository.GetUserByName(userName);
        //}
        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidParams = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidParams, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");
            return principal;
        }

    }
}
