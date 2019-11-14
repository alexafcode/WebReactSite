using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebReactSite.Models;
using WebReactSite.Services.Interfaces;
using WebReactSite.Services.Implementation;
using System.Security.Claims;
using WebReactSite.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        public async Task<IActionResult> GetUser([FromBody]string value)
        {
            var user = await _service.GetUser(value);
            if (user != null)
            {
                return StatusCode(200);
            }
            return StatusCode(400);
        }
        [Route("create")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserRegistration newuser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var user = _service.Create(newuser.Username, newuser.Password, newuser.Email);
            if (user == null)
            {
                return BadRequest();
            }
            var identity = await _service.GetIdentity(user.Login, user.Password);
            var encodedJwt = _service.GetToken(identity);
            var response = new
            {
                token = encodedJwt,
                user = user.Login,
                isAdmin = user.IsAdmin,
                email = user.Email
            };

            return Ok(response);
        }
        //api/user/signin
        [Route("signin")]
        [HttpPost]
        public async Task<IActionResult> SignIn([FromQuery] string login, string password)
        {
            var user = await _service.GetUser(login);
            if (user == null)
            {
                return Unauthorized();
            }
            var identity = await _service.GetIdentity(login, password);
            if (identity == null)
            {
                return Unauthorized();
            }

            var encodedJwt =  _service.GetToken(identity);

            var response = new
            {
                token = encodedJwt,
                user = user.Login,
                isAdmin = user.IsAdmin,
                email = user.Email
            };

            return Ok(response);
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
