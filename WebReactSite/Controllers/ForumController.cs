using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebReactSite.Models;
using WebReactSite.Services.Interfaces;
using WebReactSite.ViewModels;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebReactSite.Controllers
{
    [Route("api/[controller]")]
    public class ForumController : Controller
    {

        IForumService _forumService;
        public ForumController(IForumService service)
        {
            _forumService = service;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST api/<controller>
        [Route("addcomment")]
        [HttpPost]
        public async Task AddComment([FromBody] AddForumThemeRequest request)
        {
            await _forumService.AddForumTheme(request);
        }

    }
}
