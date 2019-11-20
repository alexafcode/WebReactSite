using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;

namespace WebReactSite.Interfaces
{
    public interface IForumRepository
    {
        public IEnumerable<ForumTheme> GetForumTheme();
    }
}
