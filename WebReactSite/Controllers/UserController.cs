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
        public async Task Create([FromBody] User user)
        {
            await _service.Create(user);
        }
        //api/user/signin
        [Route("signin")]
        [HttpPost]
        public async Task<IActionResult> SignIn([FromBody] User user)
        {
            var identity = await GetIdentity(user.Login, user.Password);
            // var identity = await GetIdentity(login, password);
            if (identity == null)
            {
                return Unauthorized();
            }

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var response = new
            {
                token = encodedJwt,
                user = user.Login,
                isAdmin = user.IsAdmin

            };

            return Ok(response);
        }

        private async Task<IReadOnlyCollection<Claim>> GetIdentity(string username, string password)
        {
            List<Claim> claims = null;
            var user = await _service.GetUser(username);
            if (user != null)
            {
                //ToDo check password decrypt
                if(user.Password == password)
                {
                    claims = new List<Claim>
                    {
                        new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login)
                    };
                }
            }
            return claims;
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
