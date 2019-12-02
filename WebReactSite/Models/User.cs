using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebReactSite.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Login { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        public string UserAvatar { get; set; }
    }
}
