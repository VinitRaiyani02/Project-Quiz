using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Win32;
using QuizServices.Common;
using QuizServices.IServices;
using QuizServices.Services;

namespace QuizApi.Controllers.LoginController
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _userService = new UserService();
            _configuration = configuration;
        }
    
        [HttpGet]
        [AllowAnonymous]
        public ApiResponse<LoginResponse> Login(string email, string password)
        {
            var data = _userService.Login(email, password);

            var jwtSettings = _configuration.GetSection(nameof(JwtSetting)).Get<JwtSetting>();
            var token = JwtTokenHelper.GenerateToken(jwtSettings, data);
            LoginResponse response = new LoginResponse();
            response.token = token;
            return new ApiResponse<LoginResponse>(200, true, "login successfull", response);
        }

        [HttpPost]
        [AllowAnonymous]
        public ApiResponse<UserModel> RegisterUser(UserModel model)
        {
            var data = _userService.Register(model);
            return new ApiResponse<UserModel>(200, true, "user registered successfully", data);
        }
    }
    
}
