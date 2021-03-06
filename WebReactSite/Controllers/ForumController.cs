﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebReactSite.Models;
using WebReactSite.Services.Interfaces;
using WebReactSite.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;


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
        [Authorize]
        [Route("theme")]
        [HttpPost]
        public async Task<IActionResult> AddTheme([FromBody] AddForumThemeRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _forumService.AddForumTheme(request);
            return Ok();
            
        }
        [Route("post")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddPost([FromBody] AddPostRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            await _forumService.AddPost(request);
            return Ok();
        }
        [Route("post")]
        [HttpGet]
        public IActionResult GetPostsByID([FromQuery]int id)
        {
            var posts = _forumService.GetPostsByForumId(id);
            return Ok(posts);
        }

        [Route("postById")]
        [HttpGet]
        //[HttpGet("{id}")]
        //[HttpGet("postById/{id}", Name = "postById")]
        public IActionResult GetPostByPostId([FromQuery]int id)
        {
            var post = _forumService.GetPostByPostId(id);
            return Ok(post);
        }
        [Route("comment")]
        //[Authorize] //ToDo
        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] AddCommentRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            await _forumService.AddComment(request);
            return Ok();
        }
    }
}
