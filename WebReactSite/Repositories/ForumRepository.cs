using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebReactSite.Models;
using WebReactSite.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace WebReactSite.Repositories
{
    public class ForumRepository : BaseRepository, IForumRepository
    {
        public ForumRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public IEnumerable<ForumTheme> GetForumTheme()
        {
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            return context.ForumThemes.ToList();
        }
        public async Task AddForumTheme(ForumTheme ft)
        {
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            context.ForumThemes.Add(ft);
            await context.SaveChangesAsync();
        }
        public async Task<int> AddPost(Post post)
        {
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            context.Posts.Add(post);
            await context.SaveChangesAsync();
            int postId = post.PostId;
            return postId;
        }
        public async Task AddTags(List<Tag> tags)
        {
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            tags.ForEach(t => context.Add(t));
            await context.SaveChangesAsync();
        }
        public  IEnumerable<Post> GetPostsByForumId(int id)
        {
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            return context.Posts.Include(p => p.Tags).Include(p => p.Comments).Where(p => p.ForumId == id).ToList();
        }

        public Post GetPostByPostId(int id)
        {
            using var constext = ContextFactory.CreateDbContext(ConnectionString);
            return constext.Posts.Include(p => p.Tags).Include(p => p.Comments).Where(p => p.PostId == id).FirstOrDefault();
        }
        public async Task AddComment(Comment comment)
        {
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            context.Comments.Add(comment);
            await context.SaveChangesAsync();
        }
        public Comment GetCommentById(int id)
        {
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            return context.Comments.Where(c => c.CommentId == id).FirstOrDefault();
        }
    }
}
