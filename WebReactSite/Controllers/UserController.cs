using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebReactSite.Models;
using WebReactSite.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Net;
using WebReactSite.ViewModels;


namespace WebReactSite.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        IUserService _service;
        public UserController(IUserService service)
        {
            _service = service;
        }

        // GET: api/<controller>
        [Authorize]
        [Route("getall")]
        [HttpGet]
        public IEnumerable<User> GetAll()
        {
            return _service.GetAll();
        }

        // POST api/<controller>
        [Route("get")]
        [HttpPost]
        //public Task<IActionResult> GetUser([FromBody]string value)
        //{

        //}
        [Route("create")]
        [HttpPost]
        public IActionResult Create([FromBody] UserRegistration newuser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            User user;
            try
            {
                user = _service.Create(newuser.Username.ToLower().Trim(), newuser.Password, newuser.Email.ToLower().Trim());
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

            if (user == null)
            {
                return BadRequest();
            }
            var identity = _service.GetIdentity(user.Login);
            var encodedJwt = _service.GetToken(identity);
            var response = new
            {
                token = encodedJwt,
                user = user.Login,
                isAdmin = user.IsAdmin,
                email = user.Email,
                expires_in = DateTime.Now.AddDays(7).ToString()
            };

            return Ok(response);
        }
        //api/user/signin
        [Route("signin")]
        [HttpPost]
        public IActionResult SignIn([FromQuery] string login, string password)
        {
            User user;
            try
            {
                user = _service.SignIn(login.ToLower().Trim(), password);
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }

            if (user == null)
            {
                return Unauthorized();
            }
            var identity = _service.GetIdentity(login);
            if (identity == null)
            {
                return Unauthorized();
            }

            var encodedJwt = _service.GetToken(identity);

            var response = new
            {
                token = encodedJwt,
                user = user.Login,
                isAdmin = user.IsAdmin,
                email = user.Email,
                userAvatar = user.UserAvatar,
                expires_in = DateTime.Now.AddDays(7).ToString()
            };

            return Ok(response);
        }
        [Route("upload")]
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateUserAvatar([FromForm] AddUserAvatarRequest request)
        {
            var url = await _service.UploadUserImage(request);
            if (url == null)
                return BadRequest();
            return Ok(url);
            
        }
        //// PUT api/<controller>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/<controller>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
