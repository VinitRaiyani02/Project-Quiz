using Microsoft.AspNetCore.Mvc;
using QuizServices.IServices;
using QuizServices.Services;

namespace QuizApi.Controllers.LoginController
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : Controller
    {
        private readonly ILoginService _loginService;

        public LoginController()
        {
            _loginService = new LoginService();
        }
        [HttpGet]
        public IActionResult GetList()
        {
            var data = _loginService.GetFirstRole();
            return Ok(data);
        }
    }
}
