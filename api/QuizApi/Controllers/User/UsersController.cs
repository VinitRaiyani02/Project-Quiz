﻿using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizRepository.DataModels;
using QuizServices.Interfaces;
using QuizServices.IServices;
using QuizServices.Services;

namespace QuizApi.Controllers.User
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : BaseController<UsersListModel,TblUser>
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService): base(userService)
        {
            _userService = userService;
        }
        // [HttpGet]
        // [Authorize(Roles = "1")]
        // public ApiResponse<UsersListModel> GetList(int currentPage, int pageSize)
        // {
        //     UsersListModel model = new UsersListModel();
        //     var data = _userService.GetList(currentPage, pageSize);
        //     return new ApiResponse<UsersListModel>(200, true, "Users loaded successfully", data);
        // }

        [HttpDelete]
        [Authorize(Roles = "1")]
        public ApiResponse<QuestionsModel> DeleteUser(int id)
        {
            _userService.DeleteUser(id);
            return new ApiResponse<QuestionsModel>(200, true, "user deleted successfully");
        }
    }
}
