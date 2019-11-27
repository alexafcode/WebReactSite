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
        [Route("theme")]
        [HttpGet]
        public IActionResult GetForumTheme()
        {
            var themes = _forumService.GetForumThemes();
            return Ok(themes);
        }

        // POST api/<controller>
        [Route("theme")]
        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] AddForumThemeRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _forumService.AddForumTheme(request);
            return Ok();
            
        }
        [Route("post")]
        [HttpPost]
        public async Task<IActionResult> AddPost([FromBody] AddPostRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok("Success");
        }

    }
}
