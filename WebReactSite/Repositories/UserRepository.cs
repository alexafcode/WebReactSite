﻿using System;
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
        public async Task Create(User user)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                if (string.IsNullOrWhiteSpace(user.Password))
                    throw new ApplicationException("Password is empty");
                if(context.Users.Any(u => u.Login == user.Login))
                    throw new ApplicationException("User \"" + user.Login + "\" is exist");
                //ToDo Password decrypt
                context.Users.Add(user);
                await context.SaveChangesAsync();
                //return user;
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
