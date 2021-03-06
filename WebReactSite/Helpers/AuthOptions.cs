﻿using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace WebReactSite.Helpers
{
    public class AuthOptions
    {
        public const string ISSUER = "WebReactSite"; // издатель токена
        public const string AUDIENCE = "http://localhost:44377/"; // потребитель токена
        const string KEY = "WebReactSite_secretkey!4437?";   // ключ для шифрации
        public const int LIFETIME = 60; // 7 * 24 * 60 * 60; //in minutes
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
