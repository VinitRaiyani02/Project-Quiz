using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizServices.Interfaces;
using QuizServices.Services;

namespace QuizApi.Controllers.Roles
{
    [ApiController]
    [Route("[controller]")]
    public class RolesController : Controller
    {
        private readonly IRolesService _rolesService;

        public RolesController()
        {
            _rolesService = new RolesService();
        }
        [HttpGet]
        [Authorize(Roles = "1")]
        public ApiResponse<List<RolesModel>> GetList(){
            var data = _rolesService.GetList();
            return new ApiResponse<List<RolesModel>>(200, true, "roles loaded successfully",data);
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public ApiResponse<RolesModel> SaveData(RolesModel model){
            var data = _rolesService.SaveData(model);
            return new ApiResponse<RolesModel>(200,true,"roles updated sucessfully",data);
        }

        [HttpDelete]
        [Authorize(Roles = "1")]
        public ApiResponse<RolesModel> DeleteRole(int id){
            _rolesService.DeleteRole(id);
            return new ApiResponse<RolesModel>(200,true,"role deleted sucessfully");
        }
    }
}