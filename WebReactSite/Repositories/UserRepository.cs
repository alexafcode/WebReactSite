using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebReactSite.Models;
using WebReactSite.Interfaces;

namespace WebReactSite.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }
        public async Task<User> GetUser(string userName)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.FirstOrDefaultAsync(u => u.Login == userName);
            }
        }
        public User Create(User user)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                if (!context.Users.Any(u => u.Login == user.Login) && !context.Users.Any(u => u.Email == user.Email))
                {
                    context.Add(user);
                    context.SaveChanges();
                    return user;
                }
                return null;             
            }
        }
        public IEnumerable<User> GetAll()
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return context.Users.ToList();
            }
        }
    }
}
