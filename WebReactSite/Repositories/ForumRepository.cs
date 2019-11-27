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
        public async Task AddForumTheme(ForumTheme ft)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                context.ForumThemes.Add(ft);
                await context.SaveChangesAsync();
            }
        }
        public async Task AddPost(Post post)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                context.Posts.Add(post);
                await context.SaveChangesAsync();
            }
        }
    }
}
