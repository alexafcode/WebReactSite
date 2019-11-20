using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;
using WebReactSite.Interfaces;

namespace WebReactSite.Repositories
{
    public class ForumRepository : BaseRepository, IForumRepository
    {
        public ForumRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public IEnumerable<ForumTheme> GetForumTheme()
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return context.ForumThemes.ToList();
            }
        }
    }
}
