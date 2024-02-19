using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QuizServices.Common;
using QuizServices.IServices;

namespace QuizApi.Controllers.Questions
{
    [ApiController]
    [Route("[controller]")]
    public class GetUserController : Controller
    {
        private readonly IUserService _userService;

        public GetUserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ApiResponse<UserModel> GetUserById(int id)
        {
            var data = _userService.GetUserById(id);
            return new ApiResponse<UserModel>(200, true, "data loaded successfull", data);
        }
    }
}
