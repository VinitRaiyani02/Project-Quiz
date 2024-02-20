using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizServices.Common;
using QuizServices.IServices;
using System.Security.Claims;

namespace QuizApi.Controllers.LoginController
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration,IUserService userService)
        {
            _userService = userService;
            _configuration = configuration;
        }
    
        [HttpGet]
        [AllowAnonymous]
        public ApiResponse<LoginResponse> Login(string email, string password)
        {
            var data = _userService.Login(email, password);

            var jwtSettings = _configuration.GetSection(nameof(JwtSetting)).Get<JwtSetting>();
            LoginResponse response = new LoginResponse();
            var token = JwtTokenHelper.GenerateToken(jwtSettings, data);
            response.token = token;

            return new ApiResponse<LoginResponse>(200, true, "login successfull", response);
        }

        [HttpPost]
        [AllowAnonymous]
        public ApiResponse<UserModel> RegisterUser([FromForm] UserModel model)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            
            var role = "";
            if (identity != null)
            {
                role = identity.FindFirst("http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value;
            }
            var data = _userService.Register(model,role);
            return new ApiResponse<UserModel>(200, true, "data saved successfully", data);
        }
    }
    
}
