using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace WebReactSite.Helpers
{
    public class AuthOptions
    {
        public const string ISSUER = "WebReactSite"; // издатель токена
        public const string AUDIENCE = "http://localhost:44377/"; // потребитель токена
        const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации
        public const int LIFETIME = 60; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
