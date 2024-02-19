using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizServices.Interfaces;
using QuizServices.IServices;
using QuizServices.Services;

namespace QuizApi.Controllers.User
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet]
        [Authorize(Roles = "1")]
        public ApiResponse<UsersListModel> GetList(int currentPage, int pageSize)
        {
            var data = _userService.GetList(currentPage, pageSize);
            return new ApiResponse<UsersListModel>(200, true, "Users loaded successfully", data);
        }

        [HttpDelete]
        [Authorize(Roles = "1")]
        public ApiResponse<QuestionsModel> DeleteUser(string email)
        {
            _userService.DeleteUser(email);
            return new ApiResponse<QuestionsModel>(200, true, "user deleted successfully");
        }
    }
}
